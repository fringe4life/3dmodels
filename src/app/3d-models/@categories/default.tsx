import CategoriesNavClient from "@/features/categories/components/categories-nav-client";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";

const CategoriesDefault = async () => {
  const categories = await getAllCategories();

  return <CategoriesNavClient categories={categories} />;
};

export default CategoriesDefault;
