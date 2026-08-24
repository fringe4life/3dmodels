"use client";

import { css } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state/types";

interface FormErrorProps<T = unknown> {
  actionState: Maybe<ActionState<T>>;
  isPending: boolean;
}

const FormError = <T = unknown>({
  actionState,
  isPending,
}: FormErrorProps<T>) => {
  let formErrorElement: React.ReactNode = null;
  if (actionState?.message && actionState?.status === "ERROR" && !isPending) {
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
      >
        {actionState.message}
      </div>
    );
  }
  return <ViewTransition>{formErrorElement}</ViewTransition>;
};

export { FormError };
