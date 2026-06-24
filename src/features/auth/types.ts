import type { User } from "./auth-types";

/** Whether the current request has a signed-in user (from server session). */
export interface IsAuthenticated {
  isAuthenticated: boolean;
}

type AuthenticatedState = IsAuthenticated & {
  isAuthenticated: true;
  user: User;
};

type UnauthenticatedState = IsAuthenticated & {
  isAuthenticated: false;
};

export type UserAuthState = AuthenticatedState | UnauthenticatedState;
