import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelCard } from "../../../src/features/models/components/model-card";
import { MODEL_CARD_IMAGE_SIZES } from "../../../src/features/models/components/model-card.styles";

const model = {
  categorySlug: "toys-games" as const,
  dateAdded: new Date("2023-03-15T14:30:00Z"),
  description:
    "A detailed articulated model with movable joints, flexible wings, and a long description used to guard the responsive card copy contract.",
  hasLiked: false,
  image: "/img/models/1.avif",
  likes: 24,
  name: "Articulated Dragon",
  slug: "articulated-dragon",
  userId: "user-1",
};

describe("ModelCard", () => {
  afterEach(cleanup);

  it("preserves accessible model content and interaction slots", () => {
    cleanup();
    render(
      <ModelCard
        href="/3d-models/articulated-dragon"
        isAuthenticated={false}
        model={model}
      />,
    );

    expect(
      screen
        .getByRole("link", { name: "Articulated Dragon" })
        .getAttribute("href"),
    ).toBe("/3d-models/articulated-dragon");
    expect(
      screen.getByRole("img", { name: "Articulated Dragon" }),
    ).toBeDefined();
    expect(
      screen
        .getByRole("img", { name: "Articulated Dragon" })
        .getAttribute("sizes"),
    ).toBe(MODEL_CARD_IMAGE_SIZES);
    expect(screen.getByText("toys-games")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Sign in to like this model" }),
    ).toBeDefined();
  });
});
