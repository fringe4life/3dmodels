"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import FieldError from "@/components/field-errors";
import FormError from "@/components/form-error";
import { signUpAction } from "@/features/auth/actions/sign-up-action";

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUpAction, null);
  const [isPending, startTransition] = useTransition();

  // Extract form values from payload if available (for preserving on error)
  const nameValue = state?.payload?.get("name")?.toString() ?? "";
  const emailValue = state?.payload?.get("email")?.toString() ?? "";

  return (
    <>
      <div>
        <h2 className="mt-6 text-center font-bold text-3xl text-gray-900 tracking-tight">
          Create your account
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
            <div>
              <label
                className="block font-medium text-gray-700 text-sm"
                htmlFor="name"
              >
                Name
              </label>
              <input
                autoComplete="name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-accent focus:outline-none focus:ring-orange-accent sm:text-sm"
                defaultValue={nameValue}
                id="name"
                name="name"
                required
                type="text"
              />

              <FieldError actionState={state} name="name" />
            </div>
            <div>
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
            </div>
            <div>
              <label
                className="block font-medium text-gray-700 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <input
                autoComplete="new-password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-accent focus:outline-none focus:ring-orange-accent sm:text-sm"
                id="password"
                name="password"
                required
                type="password"
              />

              <FieldError actionState={state} name="password" />
            </div>
            <FormError actionState={state} />
            <button
              className="flex w-full justify-center rounded-md bg-orange-accent px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-orange-accent/90 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2 disabled:opacity-50"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              className="font-medium text-orange-accent hover:text-orange-accent/80"
              href="/signin"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
