import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL,
});

export const { useSession, signIn, signOut } = authClient;
