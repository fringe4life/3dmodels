import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ModelDetail } from "../../../src/features/models/components/model-detail";

const description =
  "A detailed articulated model with movable joints, flexible wings, and a deliberately long description that must remain fully available in detail mode.";

const model = {
  categorySlug: "toys-games" as const,
  dateAdded: new Date("2023-03-15T14:30:00Z"),
  description,
  image: "/img/models/1.avif",
  likes: 24,
  name: "Articulated Dragon",
  slug: "articulated-dragon",
};

describe("ModelDetail", () => {
  afterEach(cleanup);

  it("renders full detail content and projected slots", () => {
    cleanup();
    render(
      <ModelDetail header={<a href="/3d-models">Back to models</a>} {...model}>
        <span>Like control</span>
      </ModelDetail>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Articulated Dragon",
      }),
    ).toBeDefined();
    expect(screen.getByRole("img", { name: description })).toBeDefined();
    expect(screen.getByText("toys-games")).toBeDefined();
    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByText("Back to models")).toBeDefined();
    expect(screen.getByText("Like control")).toBeDefined();
    expect(screen.getByRole("time").getAttribute("datetime")).toBe(
      "2023-03-15T14:30:00.000Z",
    );
  });
});
