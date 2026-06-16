import type { Maybe } from "@/types";
import type { User } from "./auth-types";

/** Whether the current request has a signed-in user (from server session). */
export type IsAuthenticated = boolean;

export type HasAuthChildren = (
  user: Maybe<User>,
  isAuthenticated: IsAuthenticated,
) => React.ReactNode;

export interface AuthButtonsProps {
  children: React.ReactNode;
  isAuthenticated: IsAuthenticated;
}

export interface AvatarProps {
  user: Maybe<Pick<Partial<User>, "name" | "image">>;
}

export interface SignUpData {
  user: Pick<User, "id" | "email" | "name">;
}
