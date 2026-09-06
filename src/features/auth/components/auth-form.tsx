"use client";

import { css } from "@styled-system/css";
import type { ReactNode } from "react";
import { FormError } from "@/components/form/form-error";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/form/input";
import { PendingButton } from "@/components/pending-button";
import {
  type AuthFormAction,
  useAuthFormAction,
} from "@/features/auth/hooks/use-auth-form-action";

interface AuthFormField {
  autoComplete: string;
  label: string;
  name: string;
  type: "email" | "password" | "text";
}

interface AuthFormProps<
  TData = unknown,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> {
  action: AuthFormAction<TData, TPayload>;
  children?: ReactNode;
  fields: readonly AuthFormField[];
  submitLabel: string;
}

const echoedFieldValue = (
  payload: Record<string, unknown> | undefined,
  field: AuthFormField,
): string | undefined => {
  if (field.type === "password") {
    return undefined;
  }
  const value = payload?.[field.name];
  return typeof value === "string" ? value : "";
};

const AuthForm = <
  TData = unknown,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
>({
  action,
  children,
  fields,
  submitLabel,
}: AuthFormProps<TData, TPayload>) => {
  const { handleAction, isPending, state } = useAuthFormAction(action);
  const payload = state?.payload as Record<string, unknown> | undefined;

  return (
    <>
      <form action={handleAction} className={css({ spaceY: 4 })}>
        {fields.map((field) => (
          <FormField
            actionState={state}
            disabled={isPending}
            key={field.name}
            label={field.label}
            name={field.name}
            transitionName={`auth-${field.name}-field`}
          >
            {(id) => (
              <Input
                autoComplete={field.autoComplete}
                defaultValue={echoedFieldValue(payload, field)}
                id={id}
                name={field.name}
                required
                type={field.type}
              />
            )}
          </FormField>
        ))}
        <FormError actionState={state} isPending={isPending} />
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
