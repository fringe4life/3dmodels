import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelsGridTitle } from "../../../src/features/models/components/models-grid-title";
import { withListingNuqsTestingAdapter } from "../../setup/nuqs-testing";

afterEach(() => {
  cleanup();
});

describe("ModelsGridTitle", () => {
  it("shows the fallback title when query is empty", () => {
    render(<ModelsGridTitle fallbackTitle="3D Models" />, {
      wrapper: withListingNuqsTestingAdapter(),
    });

    expect(
      screen.getByRole("heading", { level: 1, name: "3D Models" }),
    ).toBeDefined();
  });

  it("shows results for the query search param", () => {
    render(<ModelsGridTitle fallbackTitle="3D Models" />, {
      wrapper: withListingNuqsTestingAdapter({
        searchParams: { query: "dragon" },
      }),
    });

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: 'Results for "dragon"',
      }),
    ).toBeDefined();
  });
});
