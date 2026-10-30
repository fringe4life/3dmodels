import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelsViewResult } from "../../../src/features/models/components/models-view";

const model = {
  categorySlug: "toys-games" as const,
  dateAdded: new Date("2023-03-15T14:30:00Z"),
  description: "A detailed articulated model with movable joints.",
  hasLiked: false,
  id: "01900000-0000-7000-8000-000000000001",
  image: "/img/models/1.avif",
  likes: 24,
  name: "Alpha Model",
  slug: "alpha",
  userId: "user-1",
};

const emptyPagination = {
  currentLimit: 10 as const,
  limitOptions: [],
  nextHref: null,
  previousHref: null,
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
          pagination={emptyPagination}
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
        pagination={emptyPagination}
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
        pagination={emptyPagination}
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
        pagination={{
          currentLimit: 10,
          limitOptions: [
            { href: "/3d-models?limit=5", value: 5 },
            { href: "/3d-models", value: 10 },
            { href: "/3d-models?limit=20", value: 20 },
            { href: "/3d-models?limit=50", value: 50 },
          ],
          nextHref: null,
          previousHref: null,
        }}
        query=""
        result={{
          items: [model],
          metadata: { hasNextPage: false, hasPreviousPage: false },
          type: "success",
        }}
        returnTo="/3d-models"
      />,
    );

    expect(screen.getByText("Alpha Model")).toBeDefined();
    expect(
      screen.getByRole("navigation", { name: "Pagination limit control" }),
    ).toBeDefined();
  });
});
