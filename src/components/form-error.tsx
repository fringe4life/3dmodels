import { ViewTransition } from "react";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state";

export default function FormError<T = unknown>({
  actionState,
}: {
  actionState: Maybe<ActionState<T>>;
}) {
  let formErrorElement: React.ReactNode = null;
  if (actionState?.message && actionState?.status === "ERROR") {
    formErrorElement = (
      <div className="rounded-md bg-red-50 p-3 text-red-800 text-sm">
        {actionState.message}
      </div>
    );
  }
  return <ViewTransition>{formErrorElement}</ViewTransition>;
}
