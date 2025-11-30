import CategoriesNavClient from "@/features/categories/components/categories-nav-client";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";

export default async function CategoriesDefault() {
  const categories = await getAllCategories();

  return (
    <aside className="relative border-gray-200 border-b bg-white md:col-start-1 md:border-none">
      <nav className="md:-translate-y-1/2 no-scrollbar mask-r-from-95% md:mask-r-from-100% sticky w-full max-w-(--category-width-max) overflow-x-auto md:fixed md:top-1/2 md:overflow-visible">
        <CategoriesNavClient categories={categories} />
      </nav>
    </aside>
  );
}
