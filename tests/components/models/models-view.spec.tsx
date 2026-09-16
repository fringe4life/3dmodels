import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelsViewResult } from "../../../src/features/models/components/models-view";
import { withListingNuqsTestingAdapter } from "../../setup/nuqs-testing";

const model = {
  categorySlug: "toys-games" as const,
  dateAdded: new Date("2023-03-15T14:30:00Z"),
  description: "A detailed articulated model with movable joints.",
  hasLiked: false,
  image: "/img/models/1.avif",
  likes: 24,
  name: "Alpha Model",
  slug: "alpha",
  userId: "user-1",
};

afterEach(() => {
  cleanup();
});

describe("ModelsViewResult", () => {
  it("throws the paginated error message", () => {
    const errorSpy = spyOn(console, "error").mockImplementation(
      () => undefined,
    );

    expect(() =>
      render(
        <ModelsViewResult
          isAuthenticated={false}
          query=""
          result={{
            message: "Something went wrong. Please try again later.",
            type: "error",
          }}
          returnTo="/3d-models"
        />,
      ),
    ).toThrow("Something went wrong. Please try again later.");

    errorSpy.mockRestore();
  });

  it("shows search-miss guidance when the empty result has a query", () => {
    render(
      <ModelsViewResult
        isAuthenticated={false}
        query="dragon"
        result={{ message: "There are no Models", type: "empty" }}
        returnTo="/3d-models"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "No models found" }),
    ).toBeDefined();
    expect(
      screen.getByText('Your search for "dragon" returned no results.'),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: "Browse All Models" })
        .getAttribute("href"),
    ).toBe("/3d-models");
  });

  it("shows a catalog-empty note when the empty result has no query", () => {
    render(
      <ModelsViewResult
        isAuthenticated={false}
        query=""
        result={{ message: "There are no Models", type: "empty" }}
        returnTo="/3d-models"
      />,
    );

    expect(screen.getByText("No models found")).toBeDefined();
    expect(
      screen.queryByRole("heading", { name: "No models found" }),
    ).toBeNull();
    expect(
      screen.queryByRole("link", { name: "Browse All Models" }),
    ).toBeNull();
  });

  it("renders the grid and pagination for a successful result", () => {
    render(
      <ModelsViewResult
        isAuthenticated={false}
        query=""
        result={{
          items: [model],
          metadata: { count: 1, hasNextPage: false, page: 0 },
          type: "success",
        }}
        returnTo="/3d-models"
      />,
      { wrapper: withListingNuqsTestingAdapter() },
    );

    expect(screen.getByText("Alpha Model")).toBeDefined();
    expect(
      screen.getByRole("combobox", { name: "Pagination limit control" }),
    ).toBeDefined();
  });
});
