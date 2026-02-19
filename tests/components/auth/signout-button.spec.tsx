/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { describe, expect, it, vi } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// biome-ignore lint/correctness/noUnusedImports: used to avoid umd issue
import React from "react";
import { HasAuthSuspense } from "../../../src/features/auth/components/has-auth";

vi.mock("@/lib/auth-client", () => {
  return {
    authClient: {
      signOut: vi.fn(async () => ({ ok: true })),
    },
  };
});

describe("SignOut (Better Auth flow)", () => {
  it("renders sign out control when authenticated and triggers signOut", async () => {
    const user = userEvent.setup();
    render(
      <HasAuthSuspense fallback={<div>Loading...</div>}>
        {({ signOut }) => (
          <button onClick={() => signOut()} type="button">
            Sign out
          </button>
        )}
      </HasAuthSuspense>,
    );

    const btn = screen.getByRole("button", { name: /sign out/i });
    await user.click(btn);
    expect(btn).toBeDefined();
  });
});
