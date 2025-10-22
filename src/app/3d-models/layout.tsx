export default function ModelsLayout({
  children,
  categories,
}: LayoutProps<"/3d-models">) {
  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      {categories}
      <main className="flex-1 p-4 md:ml-64">{children}</main>
    </div>
  );
}
