import { getAllCategories } from "@/features/categories/queries/categories";
import CategoriesNavClient from "./CategoriesNavClient";

export default async function CategoriesNav() {
  'use cache'
  
  // Fetch categories data at build time (static generation)
  const categories = await getAllCategories();

  return (
    <aside className="md:-translate-y-1/2 sticky top-0 z-10 w-full border-gray-200 border-b bg-white md:fixed md:top-1/2 md:w-64 md:border-none">
      <div className="relative">
        <nav className="scrollbar-hide w-full overflow-x-auto md:overflow-visible">
          <ul className="flex whitespace-nowrap px-4 py-3 md:flex-col md:space-x-0 md:space-y-3 md:p-0">
            <CategoriesNavClient categories={categories} />
          </ul>
        </nav>
        {/* Fading edge/gradient for horizontal scroll hint on mobile */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l from-white to-transparent md:hidden" />
      </div>
    </aside>
  );
}
