"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import FieldError from "@/components/field-errors";
import FormError from "@/components/form-error";
import { signInAction } from "@/features/auth/actions/sign-in-action";
import SignInButton from "@/features/auth/components/sign-in-button";

export default function SignInPage() {
  const [state, formAction] = useActionState(signInAction, null);
  const [isPending, startTransition] = useTransition();

  // Extract email from payload if available (for preserving on error)
  const emailValue = state?.payload?.get("email")?.toString() ?? "";
  return (
    <>
      <div>
        <h2 className="mt-6 text-center font-bold text-3xl text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 space-y-6">
        <div className="rounded-md bg-white p-6 shadow-md">
          <form
            action={(formData) => {
              startTransition(() => {
                formAction(formData);
              });
            }}
            className="space-y-4"
          >
            <fieldset disabled={isPending}>
              <label
                className="block font-medium text-gray-700 text-sm"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                autoComplete="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-accent focus:outline-none focus:ring-orange-accent sm:text-sm"
                defaultValue={emailValue}
                id="email"
                name="email"
                required
                type="email"
              />
              <FieldError actionState={state} name="email" />
            </fieldset>
            <fieldset disabled={isPending}>
              <label
                className="block font-medium text-gray-700 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <input
                autoComplete="current-password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-accent focus:outline-none focus:ring-orange-accent sm:text-sm"
                id="password"
                name="password"
                required
                type="password"
              />

              <FieldError actionState={state} name="password" />
            </fieldset>
            <FormError actionState={state} />
            <button
              className="flex w-full justify-center rounded-md bg-orange-accent px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-orange-accent/90 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2 disabled:opacity-50"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-gray-300 border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <SignInButton />
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              className="font-medium text-orange-accent hover:text-orange-accent/80"
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
