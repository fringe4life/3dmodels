"use client";

import { useTransition } from "react";
import { FaSignInAlt, FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { NavLink } from "@/components/nav-link";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { AuthButtonsProps } from "../types";

const AuthButtons = ({ isAuthenticated, children }: AuthButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <div className="block-8 relative aspect-square overflow-hidden rounded-full">
          {children}
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
          <FaSignOutAlt className="block-5 aspect-square group-disabled:hidden" />
          <FaSpinner className="block-5 hidden aspect-square animate-spin group-disabled:block" />
        </button>
      </div>
    );
  }

  return (
    <NavLink
      borderPosition="bottom"
      className="inline-flex items-center justify-center px-4 py-2"
      href="/signin"
      matchStrategy="endsWith"
    >
      <span className="hidden sm:inline">Sign In</span>
      <FaSignInAlt aria-hidden className="block-6 aspect-square sm:hidden" />
    </NavLink>
  );
};

export { AuthButtons };
