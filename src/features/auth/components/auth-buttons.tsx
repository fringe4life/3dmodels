"use client";

import Link from "next/link";
import { useTransition } from "react";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { ServerUser } from "@/features/auth/types";

type AuthButtonsProps = {
  isAuthenticated: boolean;
  user?: Pick<ServerUser, "name" | "email"> | null;
};

export default function AuthButtons({
  isAuthenticated,
  user,
}: AuthButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-700">{user?.name || user?.email}</span>
        <button
          className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent disabled:opacity-50"
          disabled={isPending}
          onClick={handleSignOut}
          type="button"
        >
          {isPending ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    );
  }

  return (
    <Link
      className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent"
      href="/signin"
    >
      Sign In
    </Link>
  );
}
