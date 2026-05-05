"use client";

import { useActionState, useTransition } from "react";
import { FieldError } from "@/components/form/field-errors";
import { FormError } from "@/components/form/form-error";
import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { SubmitButton } from "@/components/form/submit-button";
import { signInAction } from "@/features/auth/actions/sign-in-action";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthFooterLink } from "@/features/auth/components/auth-footer-link";
import { SignInButton } from "@/features/auth/components/sign-in-button";
import { css } from "../../../../styled-system/css";

const SignInPage = () => {
  const [state, formAction] = useActionState(signInAction, null);
  const [isPending, startTransition] = useTransition();

  // Extract email from payload if available (for preserving on error)
  const emailValue = state?.payload?.get("email")?.toString() ?? "";

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
      <form
        action={(formData) => {
          startTransition(() => {
            formAction(formData);
          });
        }}
        className={css({ spaceY: 4 })}
      >
        <fieldset disabled={isPending}>
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
        </fieldset>
        <fieldset disabled={isPending}>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="current-password"
            id="password"
            name="password"
            required
            type="password"
          />
          <FieldError actionState={state} name="password" />
        </fieldset>
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
            whiteSpace: "nowrap",
            textAlign: "center",
          })}
        >
          <span
            className={css({
              position: "relative",
              display: "inline-block",
              backgroundColor: "white",
              color: "gray.500",
              "&::after,&::before": {
                content: "''",
                blockSize: 0.5,
                inlineSize: "full",
                position: "absolute",
                backgroundColor: "gray.300",
                insetBlockStart: "50%",
              },
              _before: {
                insetInlineEnd: "100%",
                marginInlineEnd: 2,
              },
              _after: {
                insetInlineStart: "100%",
                marginInlineStart: 2,
              },
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
