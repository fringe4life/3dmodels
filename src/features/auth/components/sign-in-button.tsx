"use client";

import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

export default function SignInButton() {
  return (
    <div className="space-y-4">
      <button
        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-2 font-semibold text-gray-900 text-sm shadow-sm ring-1 ring-gray-300 ring-inset transition-colors hover:bg-gray-50 focus:outline-offset-0"
        onClick={async () => {
          await authClient.signIn.social({
            provider: "github",
          });
        }}
        type="button"
      >
        <FaGithub className="h-5 w-5" />
        Sign in with GitHub
      </button>

      <div className="text-center">
        <p className="text-gray-500 text-sm">
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}
