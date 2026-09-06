/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InlineErrorFallback } from "../../src/components/inline-error-fallback";

afterEach(() => {
  cleanup();
});

describe("InlineErrorFallback", () => {
  it("renders the message and a reset control; retry click calls the handler", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();

    render(<InlineErrorFallback message="Failed to load User" retry={retry} />);

    expect(screen.getByText("Failed to load User")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(retry).toHaveBeenCalledTimes(1);
  });
});
