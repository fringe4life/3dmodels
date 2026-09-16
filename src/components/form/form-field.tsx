import { css, cx } from "@styled-system/css";
import { type ReactNode, useId, ViewTransition } from "react";
import { type ActionFieldErrors, FieldError } from "./field-errors";
import { Label } from "./label";

interface FormFieldProps<
  TFieldErrors extends ActionFieldErrors = ActionFieldErrors,
> {
  children: (id: string) => ReactNode;
  className?: string;
  disabled?: boolean;
  fieldErrors?: TFieldErrors;
  label: string;
  name: string;
  transitionName?: string;
}

/**
 * A reusable form field component that links a label, input, and error message
 * using a unique ID. Supports View Transitions via the transitionName prop.
 */
const FormField = <TFieldErrors extends ActionFieldErrors = ActionFieldErrors>({
  label,
  name,
  fieldErrors,
  children,
  transitionName,
  disabled,
  className,
}: FormFieldProps<TFieldErrors>) => {
  const id = useId();

  return (
    <ViewTransition name={transitionName}>
      <fieldset
        className={cx(
          css({ border: "none", margin: 0, padding: 0 }),
          className,
        )}
        disabled={disabled}
      >
        <Label htmlFor={id}>{label}</Label>
        {children(id)}
        <FieldError fieldErrors={fieldErrors} name={name} />
      </fieldset>
    </ViewTransition>
  );
};

export { FormField };
