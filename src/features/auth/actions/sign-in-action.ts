"use server";

import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { returnServerError } from "next-safe-action";
import { examples, maxLength, minLength, object, pipe, string } from "valibot";
import { auth } from "@/lib/auth";
import { actionClient, formDataInput } from "@/lib/safe-action";
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

const signInAction = actionClient
  .inputSchema(formDataInput(signInFormSchema))
  .stateAction(async ({ parsedInput: { email, password } }) => {
    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (!session) {
      returnServerError("Failed to sign in");
    }

    redirect("/", RedirectType.replace);
  });

export { signInAction };
