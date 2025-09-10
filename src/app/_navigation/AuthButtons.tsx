"use client";

import { signIn, signOut } from "next-auth/react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export default function AuthButtons({
  isAuthenticated,
  user,
}: AuthButtonsProps) {
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-700">{user?.name || user?.email}</span>
        <button
          type="button"
          onClick={() => signOut()}
          className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn()}
      className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent"
    >
      Sign In
    </button>
  );
}
