"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    signIn: () => signIn(),
    signOut: () => signOut(),
  };
}
