export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen place-content-center">
      <div className="w-full max-w-md space-y-8">{children}</div>
    </div>
  );
}
