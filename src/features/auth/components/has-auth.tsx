import { Suspense } from "react";
import getSession from "@/features/auth/queries/get-session";
import type { ServerUser } from "@/features/auth/types";
import type { Maybe } from "@/types";

// HasAuth component that provides session to children
export const HasAuth = async ({
  children,
}: {
  children: (
    user: Maybe<ServerUser>,
    isAuthenticated: boolean,
  ) => React.ReactNode;
}) => {
  const session = await getSession();
  const isAuthenticated = !!session?.user?.id;

  return <>{children(session?.user, isAuthenticated)}</>;
};

// Suspense wrapper for dynamic auth-dependent content
export const HasAuthSuspense = ({
  children,
  fallback,
}: {
  children: (
    user: Maybe<ServerUser>,
    isAuthenticated: boolean,
  ) => React.ReactNode;
  fallback: React.ReactNode;
}) => (
  <Suspense fallback={fallback}>
    <HasAuth>{children}</HasAuth>
  </Suspense>
);
