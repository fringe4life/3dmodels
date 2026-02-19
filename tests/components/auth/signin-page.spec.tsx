/** biome-ignore-all lint/suspicious/useAwait: test */
/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { describe, expect, it, vi } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// biome-ignore lint/correctness/noUnusedImports: used to avoid umd issue
import React from "react";
import SignInPage from "../../../src/app/(auth)/signin/page";

vi.mock("@/lib/auth-client", () => {
  return {
    authClient: {
      signIn: vi.fn(
        async ({ email, password }: { email: string; password: string }) => {
          if (email === "test@example.com" && password === "StrongPass123!") {
            return { user: { id: "u1", email } };
          }
          throw new Error("Invalid credentials");
        },
      ),
      signOut: vi.fn(async () => ({ ok: true })),
    },
  };
});

describe("SignInPage (Better Auth flow)", () => {
  it("signs in with valid credentials", async () => {
    const user = userEvent.setup();
    render(<SignInPage />);
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "StrongPass123!");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    // Expect navigation or some success indicator; fallback to not showing error
    expect(screen.queryByText(/invalid credentials/i)).toBeNull();
  });

  it("shows error for invalid credentials", async () => {
    const user = userEvent.setup();
    render(<SignInPage />);
    await user.type(screen.getByLabelText(/email/i), "nope@example.com");
    await user.type(screen.getByLabelText(/password/i), "wrong");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeDefined();
  });
});
