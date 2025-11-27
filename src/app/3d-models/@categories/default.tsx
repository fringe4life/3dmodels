import CategoriesNavClient from "@/features/categories/components/categories-nav-client";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";

export default async function CategoriesDefault() {
  const categories = await getAllCategories();

  return (
    <aside className="sticky inset-(--category-inset) border-gray-200 border-b bg-white md:fixed md:col-start-1 md:self-center md:border-none">
      <nav className="no-scrollbar mask-r-from-95% md:mask-r-from-100% w-full max-w-svw overflow-x-auto md:overflow-visible">
        <CategoriesNavClient categories={categories} />
      </nav>
    </aside>
  );
}
