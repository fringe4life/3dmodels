import { unstable_cacheLife as cacheLife } from "next/cache";
import Stream from "@/components/streamable";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";
import CategoriesNavClient from "./categories-nav-client";

// Fallback UI shown while `CategoriesNavClient` loads
function CategoriesNavFallback() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-6 w-12 rounded bg-gray-200" />
      <div className="mb-2 h-6 w-16 rounded bg-gray-200" />
      <div className="mb-2 h-6 w-20 rounded bg-gray-200" />
    </div>
  );
}

export default async function CategoriesNav() {
  "use cache";
  cacheLife("weeks");

  // Fetch categories data at build time (static generation)
  const categories = await getAllCategories();

  return (
    <aside className="md:-translate-y-1/2 sticky top-0 z-10 w-full border-gray-200 border-b bg-white md:fixed md:top-1/2 md:w-64 md:border-none">
      <div className="relative">
        <nav className="no-scrollbar w-full max-w-dvw overflow-x-auto md:overflow-visible">
          <ul className="flex whitespace-nowrap px-4 py-3 md:flex-col md:space-x-0 md:space-y-3 md:p-0">
            <Stream fallback={<CategoriesNavFallback />} value={categories}>
              {(items) => <CategoriesNavClient categories={items} />}
            </Stream>
          </ul>
        </nav>
        {/* Fading edge/gradient for horizontal scroll hint on mobile */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l from-white to-transparent md:hidden" />
      </div>
    </aside>
  );
}
