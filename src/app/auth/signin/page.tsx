import type { Metadata } from "next";
import { redirect } from "next/navigation";
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

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

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
            <SignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}
