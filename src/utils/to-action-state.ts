import { APIError } from "better-auth/api";
import { flatten, ValiError } from "valibot";
import type { Maybe } from "@/types";

export interface ActionState<T = unknown> {
  data?: T;
  fieldErrors: Record<string, Maybe<string[]>>;
  message: string;
  payload?: FormData;
  status?: "SUCCESS" | "ERROR";
  timestamp: number;
}

const fromErrorToActionState = <T = unknown>(
  err: unknown,
  formData?: FormData,
): ActionState<T> => {
  if (err instanceof ValiError) {
    const flattened = flatten(err.issues);
    return {
      fieldErrors: flattened.nested || {},
      message: "",
      payload: formData,
      status: "ERROR",
      timestamp: Date.now(),
    };
  }

  if (err instanceof Error || err instanceof APIError) {
    return {
      fieldErrors: {},
      message: err.message,
      payload: formData,
      status: "ERROR",
      timestamp: Date.now(),
    };
  }

  return {
    fieldErrors: {},
    message: "An unknown error occurred",
    payload: formData,
    status: "ERROR",
    timestamp: Date.now(),
  };
};

const toActionState = <T = unknown>(
  message: string,
  status: ActionState["status"],
  formData?: FormData,
  data?: T,
): ActionState<T> => ({
  data,
  fieldErrors: {},
  message,
  payload: formData,
  status,
  timestamp: Date.now(),
});

export { fromErrorToActionState, toActionState };
