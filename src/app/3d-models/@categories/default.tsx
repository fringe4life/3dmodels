import CategoriesNavClient from "@/features/categories/components/categories-nav-client";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";

export default async function CategoriesDefault() {
  const categories = await getAllCategories();

  return (
    <aside className="md:-translate-y-1/2 sticky inset-0 z-10 w-full border-gray-200 border-b bg-white md:fixed md:top-1/2 md:w-64 md:border-none">
      <nav className="no-scrollbar mask-r-from-95% md:mask-r-from-100% w-full max-w-svw overflow-x-auto md:overflow-visible">
        <CategoriesNavClient categories={categories} />
      </nav>
    </aside>
  );
}
