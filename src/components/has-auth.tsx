import type { Session } from "next-auth";
import Stream from "@/components/streamable";
import { auth } from "@/lib/auth";

// Helper type to extract props from a React component
type ComponentProps<C> = C extends React.ComponentType<infer P> ? P : never;

// Helper type to infer AuthProps from processUser return type
type InferAuthProps<P> = P extends (...args: never[]) => Promise<infer R>
  ? R
  : P extends (...args: never[]) => infer R
    ? R
    : never;

// Helper type to compute AdditionalProps (Component props minus AuthProps)
type InferAdditionalProps<C, AuthProps> = Omit<
  ComponentProps<C>,
  keyof AuthProps
>;

// Function overloads for HasAuth with different processUser signatures
function HasAuth<
  C extends React.ComponentType<ComponentProps<C>>,
  P extends (
    session: Session | null,
    isAuthenticated: boolean,
  ) => Promise<InferAuthProps<P>> | InferAuthProps<P>,
>(props: {
  Component: C;
  processUser: P;
  fallback: React.ReactNode;
  additionalProps?: never;
}): React.ReactElement;

function HasAuth<
  C extends React.ComponentType<ComponentProps<C>>,
  P extends (
    session: Session | null,
    isAuthenticated: boolean,
    additionalProps: InferAdditionalProps<C, InferAuthProps<P>>,
  ) => Promise<InferAuthProps<P>> | InferAuthProps<P>,
>(props: {
  Component: C;
  processUser: P;
  fallback: React.ReactNode;
  additionalProps: InferAdditionalProps<C, InferAuthProps<P>>;
}): React.ReactElement;

function HasAuth<
  C extends React.ComponentType<ComponentProps<C>>,
  P extends (
    session: Session | null,
    isAuthenticated: boolean,
    ...args: never[]
  ) => Promise<InferAuthProps<P>> | InferAuthProps<P>,
>({
  Component,
  processUser,
  additionalProps,
  fallback,
}: {
  Component: C;
  processUser: P;
  fallback: React.ReactNode;
  additionalProps?: InferAdditionalProps<C, InferAuthProps<P>>;
}) {
  // Internal helper function to render auth content
  const renderAuthContent = async (): Promise<React.ReactElement> => {
    const session = await auth();
    const isAuthenticated = !!session;

    type AuthProps = InferAuthProps<P>;
    type AdditionalProps = InferAdditionalProps<C, AuthProps>;
    type AllProps = ComponentProps<C>;

    // Call processUser with or without additionalProps
    let authProps: AuthProps;
    if (additionalProps !== undefined) {
      authProps = await (
        processUser as unknown as (
          sessionParam: Session | null,
          isAuthenticatedParam: boolean,
          additionalPropsParam: AdditionalProps,
        ) => Promise<AuthProps> | AuthProps
      )(session, isAuthenticated, additionalProps);
    } else {
      authProps = await processUser(session, isAuthenticated);
    }

    const mergedProps = {
      ...authProps,
      ...(additionalProps || {}),
    } as AllProps;

    // TypeScript needs this cast because React.ComponentType expects IntrinsicAttributes
    // but we've verified that mergedProps contains all required props
    // @ts-expect-error - mergedProps is correctly typed but TS needs explicit cast
    return <Component {...mergedProps} />;
  };

  return (
    <Stream fallback={fallback} value={renderAuthContent()}>
      {(content) => content}
    </Stream>
  );
}

export default HasAuth;
