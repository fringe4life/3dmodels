import type { Session } from "next-auth";
import Stream from "@/components/streamable";
import { auth } from "@/lib/auth";

export type HasAuthProps<AuthProps, AdditionalProps> = {
  Component: React.ComponentType<AuthProps & AdditionalProps>;
  processUser: (
    session: Session | null,
    isAuthenticated: boolean,
    additionalProps: AdditionalProps,
  ) => Promise<AuthProps> | AuthProps;
  additionalProps?: AdditionalProps;
  fallback?: React.ReactNode;
};

async function AuthContent<AuthProps, AdditionalProps>({
  Component,
  processUser,
  additionalProps,
}: Omit<HasAuthProps<AuthProps, AdditionalProps>, "fallback">) {
  const session = await auth();
  const isAuthenticated = !!session;
  const authProps = await processUser(
    session,
    isAuthenticated,
    additionalProps as AdditionalProps,
  );

  const mergedProps = {
    ...authProps,
    ...(additionalProps || {}),
  };

  // TypeScript needs this cast because React.ComponentType expects IntrinsicAttributes
  // @ts-expect-error - mergedProps is correctly typed but TS needs explicit cast
  return <Component {...mergedProps} />;
}

const HasAuth = <AuthProps, AdditionalProps = void>({
  Component,
  processUser,
  additionalProps,
  fallback,
}: HasAuthProps<AuthProps, AdditionalProps>) => (
  <Stream
    fallback={fallback}
    value={AuthContent({ Component, processUser, additionalProps })}
  >
    {(content) => content}
  </Stream>
);

export default HasAuth;
