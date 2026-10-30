import "../../../tests/setup/test-globals";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelsSortControls } from "../../../src/features/models/components/models-sort-controls";

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/3d-models");
});

beforeEach(() => {
  window.history.replaceState({}, "", "/3d-models");
});

describe("ModelsSortControls", () => {
  it("marks the URL sort as current", () => {
    window.history.replaceState({}, "", "/3d-models?sort=recent");
    render(<ModelsSortControls />);

    expect(
      screen.getByRole("link", { name: "Recent" }).getAttribute("aria-current"),
    ).toBe("true");
  });

  it("merges active query into sort Link hrefs and resets pager", () => {
    window.history.replaceState(
      {},
      "",
      "/3d-models?query=dragon&cursor=01900000-0000-7000-8000-000000000001&direction=backward&sort=alphabetic",
    );

    render(<ModelsSortControls />);

    const href = screen
      .getByRole("link", { name: "Popular" })
      .getAttribute("href");
    expect(href).toBeTruthy();
    const params = new URL(String(href), "http://local.invalid").searchParams;
    expect(params.get("sort")).toBe("popular");
    expect(params.get("query")).toBe("dragon");
    expect(params.get("cursor")).toBeNull();
    expect(params.get("direction")).toBeNull();
  });
});
