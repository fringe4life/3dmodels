import { css, cx } from "@styled-system/css";
import { type ReactNode, useId, ViewTransition } from "react";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state/types";
import { FieldError } from "./field-errors";
import { Label } from "./label";

interface FormFieldProps {
  actionState: Maybe<ActionState>;
  children: (id: string) => ReactNode;
  className?: string;
  disabled?: boolean;
  label: string;
  name: string;
  transitionName?: string;
}

/**
 * A reusable form field component that links a label, input, and error message
 * using a unique ID. Supports View Transitions via the transitionName prop.
 */
const FormField = ({
  label,
  name,
  actionState,
  children,
  transitionName,
  disabled,
  className,
}: FormFieldProps) => {
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
        <FieldError actionState={actionState} name={name} />
      </fieldset>
    </ViewTransition>
  );
};

export { FormField };
