/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { describe, expect, it, vi } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// biome-ignore lint/correctness/noUnusedImports: avoid umd issue
import React from "react";
import { toggleLike } from "../../../src/features/models/actions/likes";
import { HeartButtonClient } from "../../../src/features/models/components/heart-button/heart-button-client";

vi.mock("@/features/models/actions/likes", () => ({
  toggleLike: vi.fn(),
}));

describe("HeartButtonClient", () => {
  it("renders like control for authenticated user", async () => {
    const user = userEvent.setup();
    render(
      <HeartButtonClient
        hasLiked={false}
        isAuthenticated={true}
        likes={2}
        slug="m1"
        toggleAction={toggleLike}
      />,
    );
    const btn = screen.getByRole("button", { name: /^like this model$/i });
    expect(btn).toBeDefined();
    await user.click(btn);
  });
});
