import type { auth } from "@/lib/auth";

export type ServerSession = typeof auth.$Infer.Session;
export type ServerUser = ServerSession["user"];
