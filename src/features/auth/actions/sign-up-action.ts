"use server";

import { headers } from "next/headers";
import { RedirectType, redirect, unstable_rethrow } from "next/navigation";
import { maxLength, minLength, object, parse, pipe, string } from "valibot";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import {
  type ActionState,
  fromErrorToActionState,
} from "@/utils/to-action-state";
import { tryCatch } from "@/utils/try-catch";
import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../constants";
import type { SignUpData } from "../types";

// Valibot schema for sign-up form
const signUpFormSchema = object({
  name: pipe(
    string("Name must be a string"),
    minLength(MIN_NAME_LENGTH, "Name is required"),
    maxLength(MAX_NAME_LENGTH, "Name is too long"),
  ),
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

// Type for sign-up action state data

// Server action for sign-up
const signUpAction = async (
  _: Maybe<ActionState<SignUpData>>,
  formData: FormData,
): Promise<ActionState<SignUpData>> => {
  try {
    // Validate form data with Valibot (parse throws ValiError on failure)
    const { email, password, name } = parse(
      signUpFormSchema,
      Object.fromEntries(formData.entries()),
    );

    // Call Better Auth sign-up API
    const { data, error } = await tryCatch(
      async () =>
        await auth.api.signUpEmail({
          body: {
            email,
            password,
            name,
          },
          headers: await headers(),
        }),
    );

    if (error || !data) {
      throw error || new Error("Failed to sign up");
    }

    // Invalidate session cache
    // invalidateSessionCache();

    // Redirect on success
    throw redirect("/", RedirectType.replace);
  } catch (error) {
    // Handle redirect separately (it's not an error)
    unstable_rethrow(error);

    // Convert error to ActionState
    return fromErrorToActionState(error, formData);
  }
};

export { signUpAction };
