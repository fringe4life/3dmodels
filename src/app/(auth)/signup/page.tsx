"use client";

import { css } from "@styled-system/css";
import { useActionState, useTransition } from "react";
import { FormError } from "@/components/form/form-error";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/form/input";
import { SubmitButton } from "@/components/form/submit-button";
import { signUpAction } from "@/features/auth/actions/sign-up-action";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthFooterLink } from "@/features/auth/components/auth-footer-link";

const SignUpPage = () => {
  const [state, formAction] = useActionState(signUpAction, null);
  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  const { name: nameValue = "", email: emailValue = "" } = state?.payload ?? {};

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
      <form action={handleAction} className={css({ spaceY: 4 })}>
        <FormField
          actionState={state}
          label="Name"
          name="name"
          transitionName="auth-name-field"
        >
          {(id) => (
            <Input
              autoComplete="name"
              defaultValue={nameValue}
              id={id}
              name="name"
              required
              type="text"
            />
          )}
        </FormField>
        <FormField
          actionState={state}
          label="Email address"
          name="email"
          transitionName="auth-email-field"
        >
          {(id) => (
            <Input
              autoComplete="email"
              defaultValue={emailValue}
              id={id}
              name="email"
              required
              type="email"
            />
          )}
        </FormField>
        <FormField
          actionState={state}
          label="Password"
          name="password"
          transitionName="auth-password-field"
        >
          {(id) => (
            <Input
              autoComplete="new-password"
              id={id}
              name="password"
              required
              type="password"
            />
          )}
        </FormField>
        <FormError actionState={state} isPending={isPending} />
        <SubmitButton isPending={isPending}>
          <span className={css({ _groupDisabled: { display: "none" } })}>
            Sign up
          </span>
        </SubmitButton>
      </form>
    </AuthCard>
  );
};

export default SignUpPage;
