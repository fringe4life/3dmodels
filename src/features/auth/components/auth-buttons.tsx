"use client";

import Link from "next/link";
import { useTransition, ViewTransition } from "react";
import { FaUserCircle } from "react-icons/fa";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { ServerUser } from "@/features/auth/types";
import type { Maybe } from "@/types";

type AuthButtonsProps = {
  isAuthenticated: boolean;
  user: Maybe<Pick<ServerUser, "name" | "email" | "image">>;
};

const AuthButtons = ({ isAuthenticated, user }: AuthButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative aspect-square h-8 overflow-hidden rounded-full">
          {user?.image ? (
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
};

export default AuthButtons;
