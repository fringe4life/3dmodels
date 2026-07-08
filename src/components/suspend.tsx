import { Suspense, ViewTransition, type ViewTransitionProps } from "react";

type SuspendProps = Omit<React.ComponentProps<typeof Suspense>, "name"> &
  ViewTransitionProps;

const Suspend = ({ children, fallback, ...props }: SuspendProps) => (
  <Suspense fallback={fallback}>
    <ViewTransition {...props}>{children}</ViewTransition>
  </Suspense>
);

export { Suspend };
