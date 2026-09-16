import { css } from "@styled-system/css";
import type {
  FlattenedValidationErrors,
  InferSafeActionFnResult,
} from "next-safe-action";
import { ViewTransition } from "react";
import { EMPTY_LIST_LENGTH } from "@/constants";

interface FlattenedFieldErrorProbe {
  _: { _errors?: string[] };
  _errors?: string[];
}

type ActionFieldErrorMessages = NonNullable<
  FlattenedValidationErrors<FlattenedFieldErrorProbe>["fieldErrors"]["_"]
>;

/** Flattened NSA `validationErrors.fieldErrors` bag (schema-agnostic keys). */
type ActionFieldErrors = Record<string, ActionFieldErrorMessages | undefined>;

type SafeActionFnLike = (...args: never[]) => Promise<unknown>;

/** Flattened `fieldErrors` inferred from a next-safe-action fn. */
type ActionFieldErrorsOf<TAction extends SafeActionFnLike> =
  InferSafeActionFnResult<TAction> extends infer R
    ? R extends { validationErrors: { fieldErrors?: infer F } }
      ? F
      : never
    : never;

interface FieldErrorProps {
  fieldErrors?: ActionFieldErrors;
  name: string;
}

const FieldError = ({ fieldErrors, name }: FieldErrorProps) => {
  const fieldError = fieldErrors?.[name];
  let fieldErrorElement: React.ReactNode = null;
  if (fieldError && fieldError.length > EMPTY_LIST_LENGTH) {
    fieldErrorElement = (
      <span
        className={css({ color: "error", flex: "1", fontSize: "sm" })}
        data-testid={`field-error-${name}`}
        role="alert"
      >
        {fieldError[0]}
      </span>
    );
  }
  return <ViewTransition>{fieldErrorElement}</ViewTransition>;
};

export type { ActionFieldErrors, ActionFieldErrorsOf };
export { FieldError };
