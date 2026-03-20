import { NuqsAdapter } from "nuqs/adapters/next/app";

const ModelsLayout = ({
  children,
  categories,
  results,
}: LayoutProps<"/3d-models">) => (
  <NuqsAdapter>
    <div className="min-block-full grid grid-rows-[min-content_1fr] md:grid-cols-[var(--category-width-tablet)_1fr] md:grid-rows-1 md:gap-x-25">
      <aside className="max-inline-dvw md:max-inline-(--category-max-tablet) relative border-gray-200 border-b bg-white md:col-start-1 md:border-none">
        <nav className="mobile-categories no-scrollbar not-supports-scroll-timeline:mask-r-from-95% md:mask-r-from-100% sticky overflow-x-auto md:fixed md:inset-bs-1/2 md:-translate-y-1/2 md:overflow-visible">
          {categories}
        </nav>
      </aside>
      <section className="self-center p-4 has-not-found:self-start">
        {children}
        {results}
      </section>
    </div>
  </NuqsAdapter>
);

export default ModelsLayout;
