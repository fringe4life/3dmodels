import type { auth } from "@/lib/auth";
import type { Maybe } from "@/types";

export type ServerSession = typeof auth.$Infer.Session;
export type ServerUser = ServerSession["user"];

export type HasAuthChildren = (
  user: Maybe<ServerUser>,
  isAuthenticated: boolean,
) => React.ReactNode;
