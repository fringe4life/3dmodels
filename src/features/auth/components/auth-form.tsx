"use client";

import { css } from "@styled-system/css";
import { useStateAction } from "next-safe-action/hooks";
import type { ReactNode } from "react";
import { FormError } from "@/components/form/form-error";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/form/input";
import { PendingButton } from "@/components/pending-button";
import type { signInAction } from "@/features/auth/actions/sign-in-action";
import type { signUpAction } from "@/features/auth/actions/sign-up-action";
import { lastNonSecretFormValue } from "@/lib/safe-action-form";

interface AuthFormField {
  autoComplete: string;
  label: string;
  name: string;
  type: "email" | "password" | "text";
}

type AuthFormAction = typeof signInAction | typeof signUpAction;

interface AuthFormProps {
  action: AuthFormAction;
  children?: ReactNode;
  fields: readonly AuthFormField[];
  submitLabel: string;
}

const AuthForm = ({ action, children, fields, submitLabel }: AuthFormProps) => {
  const { formAction, input, isPending, result } = useStateAction(action);

  return (
    <>
      <form action={formAction} className={css({ spaceY: 4 })}>
        {fields.map((field) => (
          <FormField
            disabled={isPending}
            fieldErrors={result.validationErrors?.fieldErrors}
            key={field.name}
            label={field.label}
            name={field.name}
            transitionName={`auth-${field.name}-field`}
          >
            {(id) => (
              <Input
                autoComplete={field.autoComplete}
                defaultValue={lastNonSecretFormValue(input, field)}
                id={id}
                name={field.name}
                required
                type={field.type}
              />
            )}
          </FormField>
        ))}
        <FormError isPending={isPending} serverError={result.serverError} />
        <PendingButton
          isPending={isPending}
          transitionName="auth-submit-button"
        >
          {submitLabel}
        </PendingButton>
      </form>
      {children}
    </>
  );
};

export type { AuthFormField };
export { AuthForm };
