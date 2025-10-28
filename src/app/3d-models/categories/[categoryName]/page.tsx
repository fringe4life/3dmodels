import type { Metadata } from "next";
import CategoriesHeader from "@/features/categories/components/categories-header";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import ModelsGrid from "@/features/models/components/models-grid";
import { getModelsByCategory } from "@/features/models/queries/get-models-by-category";

export async function generateStaticParams() {
  return await getAllCategorySlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> {
  const { categoryName } = await params;
  const category = await getCategoryBySlug(categoryName);

  return {
    title: category.displayName,
    description: `Browse ${category.displayName} 3D printing models. Find STL files for your next ${category.displayName.toLowerCase()} project.`,
    openGraph: {
      title: `${category.displayName} 3D Models`,
      description: `Browse ${category.displayName} 3D printing models. Find STL files for your next ${category.displayName.toLowerCase()} project.`,
    },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">) {
  const { categoryName } = await params;

  const category = await getCategoryBySlug(categoryName);
  const models = await getModelsByCategory(categoryName);
  return (
    <>
      {/* Static header content */}
      <CategoriesHeader category={category} />
      {/* Models grid */}
      <ModelsGrid models={models} title={category.displayName} />
    </>
  );
}
