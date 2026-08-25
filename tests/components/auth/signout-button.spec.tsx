/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signOutAction } from "../../../src/features/auth/actions/sign-out-action";
import { AuthButtons } from "../../../src/features/auth/components/auth-buttons";

afterEach(() => {
  cleanup();
});

/** Navbar sign-out uses `signOutAction`, not `authClient.signOut`. */
vi.mock("@/features/auth/actions/sign-out-action", () => ({
  signOutAction: vi.fn(async () => undefined),
}));

describe("AuthButtons sign out", () => {
  it("calls signOutAction when the sign-out control is clicked", async () => {
    const user = userEvent.setup();
    render(
      <AuthButtons>
        <span>User avatar</span>
      </AuthButtons>,
    );

    await user.click(screen.getByRole("button", { name: /sign out/i }));
    expect(signOutAction).toHaveBeenCalledTimes(1);
  });
});
