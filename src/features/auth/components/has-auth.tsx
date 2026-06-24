import { Suspend } from "@/components/suspend";
import { getUser } from "@/features/auth/queries/get-user";
import type { UserAuthState } from "@/features/auth/types";

type HasAuthChildren = (auth: UserAuthState) => React.ReactNode;

interface HasAuthProps {
  children: HasAuthChildren;
}

// HasAuth component that provides session to children
const HasAuth = async ({ children }: HasAuthProps) => {
  const auth = await getUser();
  return <>{children(auth)}</>;
};

interface HasAuthSuspenseProps extends HasAuthProps {
  fallback: React.ReactNode;
}

// Suspense wrapper for dynamic auth-dependent content
const HasAuthSuspense = ({ children, fallback }: HasAuthSuspenseProps) => (
  <Suspend fallback={fallback}>
    <HasAuth>{children}</HasAuth>
  </Suspend>
);

export { HasAuthSuspense };
