import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelsGrid } from "../../../src/features/models/components/models-grid";

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

describe("ModelsGrid", () => {
  afterEach(cleanup);

  it("renders items", () => {
    render(
      <ModelsGrid
        isAuthenticated={false}
        models={[model]}
        returnTo="/3d-models"
      />,
    );
    expect(screen.getByText("Alpha Model")).toBeDefined();
  });
});
