import CategoriesNavClient from "@/features/categories/components/categories-nav-client";
import CategoriesRetryButton from "@/features/categories/components/categories-retry-button";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";

const CategoriesDefault = async () => {
  const categories = await getAllCategories();

  if (!categories) {
    return (
      <aside className="relative border-gray-200 border-b bg-white md:col-start-1 md:border-none">
        <nav className="md:-translate-y-1/2 sticky w-full md:fixed md:top-1/2">
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <p className="text-muted-foreground text-sm">
              Failed to load categories
            </p>
            <CategoriesRetryButton />
          </div>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="relative border-gray-200 border-b bg-white md:col-start-1 md:border-none">
      <nav className="md:-translate-y-1/2 no-scrollbar mask-r-from-95% md:mask-r-from-100% sticky w-full max-w-(--category-width-max) overflow-x-auto md:fixed md:top-1/2 md:overflow-visible">
        <CategoriesNavClient categories={categories} />
      </nav>
    </aside>
  );
};

export default CategoriesDefault;
