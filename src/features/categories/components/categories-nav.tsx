import { getAllCategories } from "../queries/get-all-categories";
import CategoriesNavClient from "./categories-nav-client";

export default async function CategoriesNav() {
  const categories = await getAllCategories();

  return (
    <aside className="md:-translate-y-1/2 sticky top-0 z-10 w-full border-gray-200 border-b bg-white md:fixed md:top-1/2 md:w-64 md:border-none">
      <div className="relative">
        <nav className="no-scrollbar w-full max-w-dvw overflow-x-auto md:overflow-visible">
          <CategoriesNavClient categories={categories} />
        </nav>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l from-white to-transparent md:hidden" />
      </div>
    </aside>
  );
}
