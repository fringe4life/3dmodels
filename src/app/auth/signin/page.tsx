import type { Metadata } from "next";
import Stream from "@/components/streamable";
import SignInButton from "@/features/auth/components/sign-in-button";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your PrintForge account to access the 3D printing community.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center font-bold text-3xl text-gray-900 tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-white p-6 shadow-md">
            <Stream
              fallback={
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              }
              value={SignInButton()}
            >
              {(content) => content}
            </Stream>
          </div>
        </div>
      </div>
    </div>
  );
}
