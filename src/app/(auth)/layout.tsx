const AuthLayout = ({ children }: LayoutProps<"/">) => (
  <div className="grid min-h-screen place-content-center px-4 md:-translate-y-20">
    <div className="w-full max-w-md space-y-8">{children}</div>
  </div>
);

export default AuthLayout;
