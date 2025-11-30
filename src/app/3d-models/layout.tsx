import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function ModelsLayout({
  children,
  categories,
  results,
}: LayoutProps<"/3d-models">) {
  return (
    <NuqsAdapter>
      <div className="grid min-h-screen grid-rows-[min-content_1fr] md:grid-cols-[var(--category-width-tablet)_1fr] md:grid-rows-1">
        {categories}
        <section className="self-center p-4">
          {children}
          {results}
        </section>
      </div>
    </NuqsAdapter>
  );
}
