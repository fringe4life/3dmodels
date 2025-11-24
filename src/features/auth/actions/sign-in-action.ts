"use server";

import { headers } from "next/headers";
import { RedirectType, redirect, unstable_rethrow } from "next/navigation";
import { maxLength, minLength, object, parse, pipe, string } from "valibot";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import { invalidateSessionCache } from "@/utils/cache-invalidation";
import {
  type ActionState,
  fromErrorToActionState,
} from "@/utils/to-action-state";
import { tryCatch } from "@/utils/try-catch";

// Constants for validation limits
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;
const MAX_EMAIL_LENGTH = 255;

// Valibot schema for sign-in form
const signInFormSchema = object({
  email: pipe(
    string("Email must be a string"),
    minLength(1, "Email is required"),
    maxLength(MAX_EMAIL_LENGTH, "Email is too long"),
  ),
  password: pipe(
    string("Password must be a string"),
    minLength(1, "Password is required"),
    minLength(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    ),
    maxLength(
      MAX_PASSWORD_LENGTH,
      `Password must be at most ${MAX_PASSWORD_LENGTH} characters`,
    ),
  ),
});

// Server action for sign-in
export async function signInAction(
  _: Maybe<ActionState>,
  formData: FormData,
): Promise<ActionState> {
  try {
    // Convert FormData to object
    const data: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Validate form data with Valibot (parse throws ValiError on failure)
    const { email, password } = parse(signInFormSchema, data);

    // Call Better Auth sign-in API
    const { data: authResponse, error } = await tryCatch(
      async () =>
        await auth.api.signInEmail({
          body: {
            email,
            password,
          },
          headers: await headers(),
        }),
    );

    if (error || !authResponse) {
      throw error || new Error("Failed to sign in");
    }

    // Invalidate session cache
    invalidateSessionCache();

    // Redirect on success
    throw redirect("/", RedirectType.replace);
  } catch (error) {
    // Handle redirect separately (it's an error, but needs to be thrown to be handled by the next error boundary)
    unstable_rethrow(error);

    // Convert error to ActionState
    return fromErrorToActionState(error, formData);
  }
}
