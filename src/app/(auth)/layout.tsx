const AuthLayout = ({ children }: LayoutProps<"/">) => (
  <div className="min-block-dvh grid place-content-center px-4 md:-translate-y-20">
    <div className="inline-full max-inline-md space-y-8">{children}</div>
  </div>
);

export default AuthLayout;
