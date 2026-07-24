"use client";

import { css } from "@styled-system/css";
import { useActionState, useTransition } from "react";
import { FormError } from "@/components/form/form-error";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/form/input";
import { SubmitButton } from "@/components/form/submit-button";
import { signInAction } from "@/features/auth/actions/sign-in-action";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthFooterLink } from "@/features/auth/components/auth-footer-link";
import { SignInButton } from "@/features/auth/components/sign-in-button";

const SignInPage = () => {
  const [state, formAction] = useActionState(signInAction, null);
  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  // Preserve non-secret fields on validation / auth errors
  const { email: emailValue = "" } = state?.payload ?? {};

  return (
    <AuthCard
      footer={
        <AuthFooterLink
          href="/signup"
          label="Sign up"
          prompt="Don't have an account?"
        />
      }
      title="Sign in to your account"
    >
      <form action={handleAction} className={css({ spaceY: 4 })}>
        <FormField
          actionState={state}
          disabled={isPending}
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
          disabled={isPending}
          label="Password"
          name="password"
          transitionName="auth-password-field"
        >
          {(id) => (
            <Input
              autoComplete="current-password"
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
            Sign in
          </span>
        </SubmitButton>
      </form>

      <div className={css({ marginBlockStart: 6 })}>
        <div
          className={css({
            overflow: "hidden",
            textAlign: "center",
            whiteSpace: "nowrap",
          })}
        >
          <span
            className={css({
              _after: {
                insetInlineStart: "100%",
                marginInlineStart: 2,
              },
              _before: {
                insetInlineEnd: "100%",
                marginInlineEnd: 2,
              },
              "&::after,&::before": {
                backgroundColor: "gray.300",
                blockSize: 0.5,
                content: "''",
                inlineSize: "full",
                insetBlockStart: "50%",
                position: "absolute",
              },
              backgroundColor: "white",
              color: "gray.500",
              display: "inline-block",
              position: "relative",
            })}
          >
            Or continue with
          </span>
        </div>
        <div className={css({ marginBlockStart: 6 })}>
          <SignInButton />
        </div>
      </div>
    </AuthCard>
  );
};

export default SignInPage;
