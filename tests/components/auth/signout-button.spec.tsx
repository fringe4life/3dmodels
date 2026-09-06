/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthButtons } from "../../../src/components/navbar/auth-buttons";
import { signOutAction } from "../../../src/lib/auth/sign-out-action";

afterEach(() => {
  cleanup();
});

/** Navbar sign-out uses `signOutAction`, not `authClient.signOut`. */
vi.mock("@/lib/auth/sign-out-action", () => ({
  signOutAction: vi.fn(async () => undefined),
}));

const renderAuthButtons = () => {
  render(
    <AuthButtons transitionName="navbar-sign-out-desktop">
      <span>User avatar</span>
    </AuthButtons>,
  );
};

describe("AuthButtons sign out", () => {
  it("calls signOutAction when the sign-out control is submitted", async () => {
    const user = userEvent.setup();
    renderAuthButtons();

    await user.click(screen.getByRole("button", { name: /sign out/i }));
    expect(signOutAction).toHaveBeenCalledTimes(1);
  });

  it("surfaces signOutAction ERROR ActionState to the user", async () => {
    const mockedSignOutAction = signOutAction as unknown as {
      mockResolvedValueOnce: (value: {
        fieldErrors: Record<string, never>;
        message: string;
        status: "ERROR";
        timestamp: number;
      }) => void;
    };
    mockedSignOutAction.mockResolvedValueOnce({
      fieldErrors: {},
      message: "Sign out failed",
      status: "ERROR",
      timestamp: 1,
    });

    const user = userEvent.setup();
    renderAuthButtons();

    await user.click(screen.getByRole("button", { name: /sign out/i }));

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/sign out failed/i);
  });

  it("keeps the control named Sign out", () => {
    renderAuthButtons();

    expect(screen.getByRole("button", { name: /sign out/i })).toBeTruthy();
  });

  it("uses a form submit control", () => {
    renderAuthButtons();

    const button = screen.getByRole("button", { name: /sign out/i });
    expect(button.getAttribute("type")).toBe("submit");
  });
});
