import { Suspend } from "@/components/suspend";
import { getUser } from "@/features/auth/queries/get-user";
import type { UserAuthState } from "@/features/auth/types";
import type { Prettify } from "@/types";

type HasAuthChildren = (
  auth: UserAuthState,
) => React.ReactNode | Promise<React.ReactNode>;

interface HasAuthProps {
  children: HasAuthChildren;
}

const HasAuth = async ({ children }: HasAuthProps) => {
  const auth = await getUser();
  const result = children(auth);
  return result instanceof Promise ? await result : result;
};

type HasAuthSuspenseProps = Prettify<
  HasAuthProps & {
    fallback: React.ReactNode;
  }
>;

// Suspense wrapper for dynamic auth-dependent content
const HasAuthSuspense = ({ children, fallback }: HasAuthSuspenseProps) => (
  <Suspend fallback={fallback}>
    <HasAuth>{children}</HasAuth>
  </Suspend>
);

export { HasAuthSuspense };
