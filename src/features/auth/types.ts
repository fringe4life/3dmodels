import type { auth } from "@/lib/auth";
import type { Maybe } from "@/types";

export type ServerSession = typeof auth.$Infer.Session;
export type User = ServerSession["user"];

export type HasAuthChildren = (
  user: Maybe<User>,
  isAuthenticated: boolean,
) => React.ReactNode;

export interface AuthButtonsProps {
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
