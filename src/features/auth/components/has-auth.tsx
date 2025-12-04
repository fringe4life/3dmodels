import { Suspense } from "react";
import getSession from "@/features/auth/queries/get-session";
import type { HasAuthChildren } from "@/features/auth/types";

// HasAuth component that provides session to children
export const HasAuth = async ({ children }: { children: HasAuthChildren }) => {
  const user = await getSession();
  const isAuthenticated = !!user?.id;

  return <>{children(user, isAuthenticated)}</>;
};

// Suspense wrapper for dynamic auth-dependent content
export const HasAuthSuspense = ({
  children,
  fallback,
}: {
  children: HasAuthChildren;
  fallback: React.ReactNode;
}) => (
  <Suspense fallback={fallback}>
    <HasAuth>{children}</HasAuth>
  </Suspense>
);
