"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaSpinner,
  FaUserCircle,
} from "react-icons/fa";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { AuthButtonsProps } from "../types";

const AuthButtons = ({ user }: AuthButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  if (user?.name) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative aspect-square h-8 overflow-hidden rounded-full">
          {user.image ? (
            <img
              alt={user.name}
              className="h-full w-full object-cover"
              height={32}
              src={user.image}
              width={32}
            />
          ) : (
            <FaUserCircle className="h-full w-full text-gray-700" />
          )}
        </div>
        <button
          className="hidden cursor-pointer rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent disabled:cursor-progress disabled:opacity-75 disabled:hover:text-gray-700 sm:block"
          disabled={isPending}
          onClick={handleSignOut}
          type="button"
        >
          {isPending ? "Signing out..." : "Sign Out"}
        </button>
        <button
          className="group block cursor-pointer rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent disabled:cursor-progress disabled:opacity-75 disabled:hover:text-gray-700 sm:hidden"
          disabled={isPending}
          onClick={handleSignOut}
          type="button"
        >
          <FaSignOutAlt className="aspect-square h-5 group-disabled:hidden" />
          <FaSpinner className="hidden aspect-square h-5 animate-spin group-disabled:block" />
        </button>
      </div>
    );
  }

  return (
    <>
      <Link
        className="hidden rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent sm:inline-block"
        href="/signin"
      >
        Sign In
      </Link>
      <Link
        className="inline-block rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent sm:hidden"
        href="/signin"
      >
        <FaSignInAlt className="aspect-square h-6" />
      </Link>
    </>
  );
};

export { AuthButtons };
