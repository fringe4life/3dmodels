import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function ModelsLayout({
  children,
  categories,
  results,
}: LayoutProps<"/3d-models">) {
  return (
    <NuqsAdapter>
      <div className="relative grid min-h-screen md:grid-cols-[var(--category-width)_1fr]">
        {categories}
        <section className="p-4 md:col-start-2">
          {children}
          {results}
        </section>
      </div>
    </NuqsAdapter>
  );
}
