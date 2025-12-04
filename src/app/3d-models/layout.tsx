import { NuqsAdapter } from "nuqs/adapters/next/app";

const ModelsLayout = ({
  children,
  categories,
  results,
}: LayoutProps<"/3d-models">) => (
  <NuqsAdapter>
    <div className="grid min-h-screen grid-rows-[min-content_1fr] md:grid-cols-[var(--category-width-tablet)_1fr] md:grid-rows-1 md:gap-x-25">
      <aside className="relative max-w-(--category-width-mobile) border-gray-200 border-b bg-white md:col-start-1 md:max-w-(--category-max-tablet) md:border-none">
        <nav className="md:-translate-y-1/2 no-scrollbar mask-r-from-95% md:mask-r-from-100% sticky overflow-x-auto md:fixed md:top-1/2 md:overflow-visible">
          {categories}
        </nav>
      </aside>
      <section className="self-center p-4">
        {children}
        {results}
      </section>
    </div>
  </NuqsAdapter>
);

export default ModelsLayout;
