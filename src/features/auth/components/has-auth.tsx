import { Suspense } from "react";
import getSession from "@/features/auth/queries/get-session";
import type { ServerSession } from "@/features/auth/types";
import type { Maybe } from "@/types";

// HasAuth component that provides session to children
export const HasAuth = async ({
  children,
}: {
  children: (
    session: Maybe<ServerSession>,
    isAuthenticated: boolean,
  ) => React.ReactNode;
}) => {
  const session = await getSession();

  const isAuthenticated = !!session?.user?.id;

  return <>{children(session, isAuthenticated)}</>;
};

// Suspense wrapper for dynamic auth-dependent content
export const HasAuthSuspense = ({
  children,
  fallback,
}: {
  children: (
    session: Maybe<ServerSession>,
    isAuthenticated: boolean,
  ) => React.ReactNode;
  fallback: React.ReactNode;
}) => (
  <Suspense fallback={fallback}>
    <HasAuth>{children}</HasAuth>
  </Suspense>
);
