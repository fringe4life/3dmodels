import { Suspense } from "react";
import { getUser } from "@/features/auth/queries/get-user";
import type { HasAuthChildren } from "@/features/auth/types";

// HasAuth component that provides session to children
const HasAuth = async ({ children }: { children: HasAuthChildren }) => {
  const user = await getUser();
  const isAuthenticated = !!user?.id;

  return <>{children(user, isAuthenticated)}</>;
};

// Suspense wrapper for dynamic auth-dependent content
const HasAuthSuspense = ({
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

export { HasAuthSuspense };
