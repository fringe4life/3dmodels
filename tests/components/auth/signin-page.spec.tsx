/** biome-ignore-all lint/suspicious/useAwait: test */
/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInPage from "../../../src/app/(auth)/signin/page";

afterEach(() => {
  cleanup();
});

/** Email/password form uses `signInAction`, not `authClient`; mock the action so tests don't hit real auth/DB. */
vi.mock("@/features/auth/actions/sign-in-action", () => ({
  signInAction: vi.fn(async (_: unknown, formData: FormData) => {
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    if (email === "test@example.com" && password === "StrongPass123!") {
      return {
        fieldErrors: {},
        message: "",
        status: "SUCCESS" as const,
        timestamp: Date.now(),
      };
    }
    return {
      fieldErrors: {},
      message: "Invalid email or password",
      payload: formData,
      status: "ERROR" as const,
      timestamp: Date.now(),
    };
  }),
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      social: vi.fn(async () => ({ ok: true })),
    },
    signOut: vi.fn(async () => ({ ok: true })),
  },
}));

describe("SignInPage (Better Auth flow)", () => {
  it("signs in with valid credentials", async () => {
    const user = userEvent.setup();
    render(<SignInPage />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "StrongPass123!");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    await waitFor(() => {
      const submit = screen.getByRole("button", {
        name: /^sign in$/i,
      }) as HTMLButtonElement;
      expect(submit.disabled).toBe(false);
    });
    expect(screen.queryByTestId("form-error")).toBeNull();
    expect(screen.queryByTestId("field-error-email")).toBeNull();
    expect(screen.queryByTestId("field-error-password")).toBeNull();
  });

  it("shows form error for invalid credentials", async () => {
    const user = userEvent.setup();
    render(<SignInPage />);

    await user.type(screen.getByLabelText(/email/i), "nope@example.com");
    await user.type(screen.getByLabelText(/password/i), "WrongPass123!");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    const formError = await screen.findByTestId("form-error");
    expect(formError.textContent).toMatch(/invalid email or password/i);
    expect(screen.queryByTestId("field-error-email")).toBeNull();
    expect(screen.queryByTestId("field-error-password")).toBeNull();
  });

  it("clears auth error and signs in after correcting credentials", async () => {
    const user = userEvent.setup();
    render(<SignInPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "nope@example.com");
    await user.type(passwordInput, "WrongPass123!");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect((await screen.findByTestId("form-error")).textContent).toMatch(
      /invalid email or password/i,
    );

    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "StrongPass123!");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    await waitFor(() => {
      expect(screen.queryByTestId("form-error")).toBeNull();
    });
    expect(screen.queryByTestId("field-error-email")).toBeNull();
    expect(screen.queryByTestId("field-error-password")).toBeNull();
  });
});
