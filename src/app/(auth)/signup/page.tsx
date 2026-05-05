"use client";

import { useActionState, useTransition } from "react";
import { FieldError } from "@/components/form/field-errors";
import { FormError } from "@/components/form/form-error";
import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { SubmitButton } from "@/components/form/submit-button";
import { signUpAction } from "@/features/auth/actions/sign-up-action";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthFooterLink } from "@/features/auth/components/auth-footer-link";
import { css } from "../../../../styled-system/css";

const SignUpPage = () => {
  const [state, formAction] = useActionState(signUpAction, null);
  const [isPending, startTransition] = useTransition();

  // Extract form values from payload if available (for preserving on error)
  const nameValue = state?.payload?.get("name")?.toString() ?? "";
  const emailValue = state?.payload?.get("email")?.toString() ?? "";

  return (
    <AuthCard
      footer={
        <AuthFooterLink
          href="/signin"
          label="Sign in"
          prompt="Already have an account?"
        />
      }
      title="Create your account"
    >
      <form
        action={(formData) => {
          startTransition(() => {
            formAction(formData);
          });
        }}
        className={css({ spaceY: 4 })}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            autoComplete="name"
            defaultValue={nameValue}
            id="name"
            name="name"
            required
            type="text"
          />
          <FieldError actionState={state} name="name" />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            autoComplete="email"
            defaultValue={emailValue}
            id="email"
            name="email"
            required
            type="email"
          />
          <FieldError actionState={state} name="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="new-password"
            id="password"
            name="password"
            required
            type="password"
          />
          <FieldError actionState={state} name="password" />
        </div>
        <FormError actionState={state} isPending={isPending} />
        <SubmitButton isPending={isPending}>
          {/*"group-disabled:hidden"*/}
          <span className={css({ _groupDisabled: { display: "hidden" } })}>
            Sign up
          </span>
        </SubmitButton>
      </form>
    </AuthCard>
  );
};

export default SignUpPage;
