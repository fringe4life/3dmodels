"use server";

import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { returnServerError } from "next-safe-action";
import { maxLength, minLength, object, pipe, string } from "valibot";
import { auth } from "@/lib/auth";
import { actionClient, formDataInput } from "@/lib/safe-action";
import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../constants";

const signUpFormSchema = object({
  email: pipe(
    string("Email must be a string"),
    minLength(1, "Email is required"),
    maxLength(MAX_EMAIL_LENGTH, "Email is too long"),
  ),
  name: pipe(
    string("Name must be a string"),
    minLength(MIN_NAME_LENGTH, "Name is required"),
    maxLength(MAX_NAME_LENGTH, "Name is too long"),
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

const signUpAction = actionClient
  .inputSchema(formDataInput(signUpFormSchema))
  .stateAction(async ({ parsedInput: { email, name, password } }) => {
    const session = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
      headers: await headers(),
    });

    if (!session) {
      returnServerError("Failed to sign up");
    }

    redirect("/", RedirectType.replace);
  });

export { signUpAction };
