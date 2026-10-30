import "../../../tests/setup/test-globals";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelsGridTitle } from "../../../src/features/models/components/models-grid-title";

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/3d-models");
});

beforeEach(() => {
  window.history.replaceState({}, "", "/3d-models");
});

describe("ModelsGridTitle", () => {
  it("shows the fallback title when query is empty", () => {
    render(<ModelsGridTitle fallbackTitle="3D Models" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "3D Models" }),
    ).toBeDefined();
  });

  it("shows results for the query search param", () => {
    window.history.replaceState({}, "", "/3d-models?query=dragon");
    render(<ModelsGridTitle fallbackTitle="3D Models" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: 'Results for "dragon"',
      }),
    ).toBeDefined();
  });
});
