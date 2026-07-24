import type { Maybe } from "@/types";

/**
 * T — success `data`
 * U — safe form echo shape (plain fields; payload is Partial of U)
 */
export interface ActionState<
  T = unknown,
  U extends Record<string, unknown> = Record<string, unknown>,
> {
  data?: T;
  fieldErrors: Record<string, Maybe<string[]>>;
  message: string;
  payload?: Partial<U>;
  status?: "SUCCESS" | "ERROR";
  timestamp: number;
}
