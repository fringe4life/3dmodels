import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import SignInButton from "./SignInButton";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your PrintForge account to access the 3D printing community.",
  robots: {
    index: false,
    follow: false,
  },
};

// Server component that handles auth check
async function SignInContent() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md bg-white p-6 shadow-md">
        <SignInButton />
      </div>
    </div>
  );
}

// Loading skeleton for signin content
function SignInSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md bg-white p-6 shadow-md">
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center font-bold text-3xl text-gray-900 tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <Suspense fallback={<SignInSkeleton />}>
          <SignInContent />
        </Suspense>
      </div>
    </div>
  );
}
