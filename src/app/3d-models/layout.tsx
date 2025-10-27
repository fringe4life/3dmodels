export default function ModelsLayout({
  children,
  categories,
  results,
}: LayoutProps<"/3d-models">) {
  return (
    <div className="relative grid min-h-screen md:grid-flow-col">
      {categories}
      <main className="p-4 md:ml-64">
        {children}
        {results}
      </main>
    </div>
  );
}
