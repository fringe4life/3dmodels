import type { auth } from "@/lib/auth";
import type { Maybe } from "@/types";

export type ServerSession = typeof auth.$Infer.Session;
export type User = ServerSession["user"];

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

export interface UserVerifiable {
  userId: string;
}

export interface IsOwner {
  isOwner: boolean;
}
