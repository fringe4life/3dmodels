import { APIError } from "better-auth/api";
import { flatten, ValiError } from "valibot";
import type { ActionState } from "./types";

const fromErrorToActionState = <
  T = unknown,
  U extends Record<string, unknown> = Record<string, unknown>,
>(
  err: unknown,
  payload?: Partial<U>,
): ActionState<T, U> => {
  if (err instanceof ValiError) {
    const flattened = flatten(err.issues);
    return {
      fieldErrors: flattened.nested || {},
      message: "",
      payload,
      status: "ERROR",
      timestamp: Date.now(),
    };
  }

  if (err instanceof Error || err instanceof APIError) {
    return {
      fieldErrors: {},
      message: err.message,
      payload,
      status: "ERROR",
      timestamp: Date.now(),
    };
  }

  return {
    fieldErrors: {},
    message: "An unknown error occurred",
    payload,
    status: "ERROR",
    timestamp: Date.now(),
  };
};

const toActionState = <
  T = unknown,
  U extends Record<string, unknown> = Record<string, unknown>,
>(
  message: string,
  status: ActionState["status"],
  payload?: Partial<U>,
  data?: T,
): ActionState<T, U> => ({
  data,
  fieldErrors: {},
  message,
  payload,
  status,
  timestamp: Date.now(),
});

export { fromErrorToActionState, toActionState };
