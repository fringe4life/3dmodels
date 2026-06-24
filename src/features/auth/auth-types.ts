import "server-only";
import type { auth } from "@/lib/auth";

type ServerSession = typeof auth.$Infer.Session;
export type User = ServerSession["user"];
