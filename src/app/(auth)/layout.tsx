const AuthLayout = ({ children }: LayoutProps<"/">) => (
  <div className="md:-translate-y-20 grid min-h-screen place-content-center">
    <div className="w-full max-w-md space-y-8">{children}</div>
  </div>
);

export default AuthLayout;
