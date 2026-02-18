import { APIError } from "better-auth/api";
import { flatten, ValiError } from "valibot";

export interface ActionState<T = unknown> {
  data?: T;
  fieldErrors: Record<string, string[] | undefined>;
  message: string;
  payload?: FormData;
  status?: "SUCCESS" | "ERROR";
  timestamp: number;
}

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

const fromErrorToActionState = <T = unknown>(
  err: unknown,
  formData?: FormData,
): ActionState<T> => {
  if (err instanceof ValiError) {
    const flattened = flatten(err.issues);
    return {
      message: "",
      timestamp: Date.now(),
      fieldErrors: flattened.nested || {},
      payload: formData,
      status: "ERROR",
    };
  }

  if (err instanceof Error || err instanceof APIError) {
    return {
      message: err.message,
      fieldErrors: {},
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
  message,
  fieldErrors: {},
  status,
  timestamp: Date.now(),
  payload: formData,
  data,
});

export { fromErrorToActionState, toActionState };
