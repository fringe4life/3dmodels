"use client";

import { css } from "@styled-system/css";
import { ViewTransition } from "react";

interface FormErrorProps {
  isPending: boolean;
  serverError?: string;
}

const FormError = ({ isPending, serverError }: FormErrorProps) => {
  let formErrorElement: React.ReactNode = null;
  if (serverError && !isPending) {
    formErrorElement = (
      <div
        className={css({
          backgroundColor: "error.bg",
          color: "error.text",
          fontSize: "sm",
          padding: 3,
          rounded: "md",
        })}
        data-testid="form-error"
        role="alert"
      >
        {serverError}
      </div>
    );
  }
  return <ViewTransition>{formErrorElement}</ViewTransition>;
};

export { FormError };
