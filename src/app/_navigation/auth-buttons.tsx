"use client";

import { signIn, signOut } from "next-auth/react";

type AuthButtonsProps = {
  isAuthenticated: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
};

export default function AuthButtons({
  isAuthenticated,
  user,
}: AuthButtonsProps) {
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-700">{user?.name || user?.email}</span>
        <button
          className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent"
          onClick={() => signOut()}
          type="button"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent"
      onClick={() => signIn()}
      type="button"
    >
      Sign In
    </button>
  );
}
