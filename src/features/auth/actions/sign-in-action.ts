"use server";

import { headers } from "next/headers";
import { RedirectType, redirect, unstable_rethrow } from "next/navigation";
import {
  examples,
  maxLength,
  minLength,
  object,
  parse,
  pipe,
  string,
} from "valibot";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import { invalidateSessionCache } from "@/utils/cache-invalidation";
import {
  type ActionState,
  fromErrorToActionState,
} from "@/utils/to-action-state";
import { tryCatch } from "@/utils/try-catch";
import {
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../constants";

const signInFormSchema = object({
  email: pipe(
    string("Email must be a string"),
    minLength(MIN_EMAIL_LENGTH, "Email is required"),
    maxLength(MAX_EMAIL_LENGTH, "Email is too long"),
    examples([
      "john@gmail.com",
      "jane@protonmail.com",
      "mike@yahoo.com",
      "admin@admin.com",
    ]),
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

const signInAction = async (
  _: Maybe<ActionState>,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const { email, password } = parse(
      signInFormSchema,
      Object.fromEntries(formData.entries()),
    );

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

    invalidateSessionCache();

    throw redirect("/", RedirectType.replace);
  } catch (error) {
    unstable_rethrow(error);

    return fromErrorToActionState(error, formData);
  }
};

export default signInAction;
