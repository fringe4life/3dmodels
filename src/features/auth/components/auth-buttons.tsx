"use client";

import Link from "next/link";
import { useTransition, ViewTransition } from "react";
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
        <ViewTransition>
          <button
            className="cursor-pointer rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent disabled:cursor-progress disabled:opacity-75 disabled:hover:text-gray-700"
            disabled={isPending}
            onClick={handleSignOut}
            type="button"
          >
            {isPending ? "Signing out..." : "Sign Out"}
          </button>
        </ViewTransition>
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
