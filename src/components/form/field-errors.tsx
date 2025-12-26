import { ViewTransition } from "react";
import type { FieldErrorProps } from "@/types";

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  // Only use fieldErrors for security (no payload fallback to avoid exposing sensitive data)
  const fieldError = actionState?.fieldErrors[name];
  let fieldErrorElement: React.ReactNode = null;
  if (fieldError && fieldError.length > 0) {
    fieldErrorElement = (
      <span className="text-red-500 text-sm">{fieldError[0]}</span>
    );
  }
  return <ViewTransition>{fieldErrorElement}</ViewTransition>;
};

export default FieldError;
