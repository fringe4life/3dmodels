"use client";

import { type MouseEventHandler, useTransition, ViewTransition } from "react";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

export default function SignInButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
      });
    });
  };
  return (
    <div className="space-y-4">
      <ViewTransition>
        <button
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-2 font-semibold text-gray-900 text-sm shadow-sm ring-1 ring-gray-300 ring-inset transition-colors hover:bg-gray-50 focus:outline-offset-0 disabled:cursor-progress disabled:opacity-75 disabled:hover:bg-white"
          disabled={isPending}
          onClick={handleClick}
          type="button"
        >
          <FaGithub className="aspect-square h-5" />
          {isPending ? "Signing in..." : "Sign in with GitHub"}
        </button>
      </ViewTransition>
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}
