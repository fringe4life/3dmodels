import { ViewTransition } from "react";
import { EMPTY_LIST_LENGTH } from "@/constants";
import type { FieldErrorProps } from "@/types";

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const fieldError = actionState?.fieldErrors[name];
  let fieldErrorElement: React.ReactNode = null;
  if (fieldError && fieldError.length > EMPTY_LIST_LENGTH) {
    fieldErrorElement = (
      <span className="flex-1 text-red-500 text-sm">{fieldError[0]}</span>
    );
  }
  return <ViewTransition>{fieldErrorElement}</ViewTransition>;
};

export { FieldError };
