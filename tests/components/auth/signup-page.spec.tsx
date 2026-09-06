/** biome-ignore-all lint/suspicious/useAwait: test */
/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "../../../src/app/(auth)/signup/page";

afterEach(() => {
  cleanup();
});

/** Email/password form uses `signUpAction`; mock so tests don't hit real auth/DB. */
vi.mock("@/features/auth/actions/sign-up-action", () => ({
  signUpAction: vi.fn(async () => ({
    fieldErrors: {},
    message: "Unable to create account",
    status: "ERROR" as const,
    timestamp: Date.now(),
  })),
}));

describe("SignUpPage", () => {
  it("renders name, email, and password fields without GitHub OAuth", () => {
    render(<SignUpPage />);

    expect(screen.getByLabelText(/^name$/i)).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /^sign up$/i })).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /sign in with github/i }),
    ).toBeNull();
  });

  it("shows form error when sign-up fails", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    await user.type(screen.getByLabelText(/^name$/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.type(screen.getByLabelText(/password/i), "StrongPass123!");
    await user.click(screen.getByRole("button", { name: /^sign up$/i }));

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/unable to create account/i);
  });
});
