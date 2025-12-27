"use client";

import { ViewTransition } from "react";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state";

const FormError = <T = unknown>({
  actionState,
  isPending,
}: {
  actionState: Maybe<ActionState<T>>;
  isPending: boolean;
}) => {
  let formErrorElement: React.ReactNode = null;
  if (actionState?.message && actionState?.status === "ERROR" && !isPending) {
    formErrorElement = (
      <div className="rounded-md bg-red-50 p-3 text-red-800 text-sm">
        {actionState.message}
      </div>
    );
  }
  return <ViewTransition>{formErrorElement}</ViewTransition>;
};

export { FormError };
