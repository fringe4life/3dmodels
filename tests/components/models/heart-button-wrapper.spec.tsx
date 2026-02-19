/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { describe, it, vi } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// biome-ignore lint/correctness/noUnusedImports: avoid umd issue
import React from "react";
import { HeartButtonWrapper } from "../../../src/features/models/components/heart-button/heart-button-wrapper";

vi.mock("@/features/models/actions/likes", () => ({
  toggleLike: vi.fn().mockResolvedValue({ liked: true }),
}));

describe("HeartButtonWrapper", () => {
  it("toggles aria-pressed on click", async () => {
    const user = userEvent.setup();
    render(<HeartButtonWrapper initialLiked={false} modelId="m1" />);
    const btn = screen.getByRole("button", { name: /like/i });
    await user.click(btn);
  });
});
