"use client";

import { useActionState, useTransition } from "react";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state/types";

type AuthFormAction<
  TData = unknown,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> = (
  prevState: Maybe<ActionState<TData, TPayload>>,
  formData: FormData,
) => Promise<ActionState<TData, TPayload>>;

interface UseAuthFormActionResult<
  TData = unknown,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> {
  handleAction: (formData: FormData) => void;
  isPending: boolean;
  state: Maybe<ActionState<TData, TPayload>>;
}

const useAuthFormAction = <
  TData = unknown,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
>(
  action: AuthFormAction<TData, TPayload>,
): UseAuthFormActionResult<TData, TPayload> => {
  const [state, formAction] = useActionState(action, null);
  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return { handleAction, isPending, state };
};

export type { AuthFormAction };
export { useAuthFormAction };
