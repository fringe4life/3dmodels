"use server";

import { headers } from "next/headers";
import { RedirectType, redirect, unstable_rethrow } from "next/navigation";
import {
  type InferOutput,
  maxLength,
  minLength,
  object,
  parse,
  pipe,
  string,
} from "valibot";
import { auth } from "@/lib/auth";
import type { Maybe, Prettify } from "@/types";
import {
  formDataToSafePayload,
  type SafeFormFields,
} from "@/utils/to-action-state/form-data-to-safe-payload";
import { fromErrorToActionState } from "@/utils/to-action-state/to-action-state";
import type { ActionState } from "@/utils/to-action-state/types";
import type { User } from "../auth-types";
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

type SignUpForm = InferOutput<typeof signUpFormSchema>;
type SignUpPayload = SafeFormFields<SignUpForm>;

interface SignUpData {
  user: Prettify<Pick<User, "id" | "email" | "name">>;
}

const signUpAction = async (
  _: Maybe<ActionState<SignUpData, SignUpPayload>>,
  formData: FormData,
): Promise<ActionState<SignUpData, SignUpPayload>> => {
  const payload = formDataToSafePayload<SignUpForm>(formData);

  try {
    const { email, password, name } = parse(
      signUpFormSchema,
      Object.fromEntries(formData.entries()),
    );

    const session = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Failed to sign up");
    }

    throw redirect("/", RedirectType.replace);
  } catch (error) {
    unstable_rethrow(error);

    return fromErrorToActionState(error, payload);
  }
};

export { signUpAction };
