import { APIError } from "better-auth/api";
import { flatten, ValiError } from "valibot";
import { mapBetterAuthErrorToFields } from "@/lib/better-auth-errors";

export type ActionState<T = unknown> = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
  data?: T;
};

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

  // Check for Better Auth APIError
  if (err instanceof APIError) {
    // In Better Auth v1.4+, APIError has message and status directly
    // Error codes may be in the message or we can check status codes
    const apiError = err as APIError & {
      code?: string;
    };

    const errorMessage = apiError.message || "Authentication error";
    const fieldErrors = mapBetterAuthErrorToFields(errorMessage, apiError.code);

    return {
      message: errorMessage,
      fieldErrors,
      payload: formData,
      status: "ERROR",
      timestamp: Date.now(),
    };
  }

  if (err instanceof Error) {
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
