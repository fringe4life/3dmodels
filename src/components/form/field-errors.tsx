import { css } from "@styled-system/css";
import { ViewTransition } from "react";
import { EMPTY_LIST_LENGTH } from "@/constants";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state/types";

interface FieldErrorProps {
  actionState: Maybe<ActionState>;
  name: string;
}

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const fieldError = actionState?.fieldErrors[name];
  let fieldErrorElement: React.ReactNode = null;
  if (fieldError && fieldError.length > EMPTY_LIST_LENGTH) {
    fieldErrorElement = (
      <span
        className={css({ color: "error", flex: "1", fontSize: "sm" })}
        data-testid={`field-error-${name}`}
      >
        {fieldError[0]}
      </span>
    );
  }
  return <ViewTransition>{fieldErrorElement}</ViewTransition>;
};

export { FieldError };
