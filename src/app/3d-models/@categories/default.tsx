import { cacheLife, cacheTag } from "next/cache";
import { CategoriesNav } from "@/features/categories/components/categories-nav";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";

const CategoriesDefault = async () => {
  "use cache";
  cacheLife("max");
  cacheTag("categories");

  const categories = await getAllCategories();

  return <CategoriesNav categories={categories} />;
};

export default CategoriesDefault;
