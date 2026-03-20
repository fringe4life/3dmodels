/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { describe, expect, it, vi } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// biome-ignore lint/style/useImportType: avoid umd issue
import React from "react";
import { HasAuthSuspense } from "../../../src/features/auth/components/has-auth";
import { authClient } from "../../../src/lib/auth-client";

vi.mock("../../../src/lib/auth-client", () => ({
  authClient: {
    signOut: vi.fn(async () => ({ ok: true })),
  },
}));

vi.mock("@/features/auth/components/has-auth", () => ({
  HasAuthSuspense: ({
    children,
  }: {
    children: (
      user: { id: string; email: string; name: string },
      isAuthenticated: boolean,
    ) => React.ReactNode;
    fallback: React.ReactNode;
  }) => <>{children({ id: "u1", email: "t@t.com", name: "Test" }, true)}</>,
}));

describe("SignOut (Better Auth flow)", () => {
  it("renders sign out control when authenticated and triggers signOut", async () => {
    const user = userEvent.setup();
    render(
      <HasAuthSuspense fallback={<div>Loading...</div>}>
        {() => (
          <button
            onClick={() => {
              authClient.signOut();
            }}
            type="button"
          >
            Sign out
          </button>
        )}
      </HasAuthSuspense>,
    );

    const btn = screen.getByRole("button", { name: /sign out/i });
    await user.click(btn);
    expect(authClient.signOut).toHaveBeenCalled();
  });
});
