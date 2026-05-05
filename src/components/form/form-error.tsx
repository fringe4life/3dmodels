"use client";

import { ViewTransition } from "react";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state";
import { css } from "../../../styled-system/css";

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
          rounded: "md",
          backgroundColor: "red.50",
          padding: 3,
          color: "red.800",
          fontSize: "sm",
        })}
      >
        {actionState.message}
      </div>
    );
  }
  return <ViewTransition>{formErrorElement}</ViewTransition>;
};

export { FormError };
