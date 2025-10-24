import type { Metadata } from "next";
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
    <div>
      {/* Static header content */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-900">
          {category.displayName} Models
        </h1>
        <p className="mt-2 text-gray-600">
          Browse our collection of {category.displayName} 3D printing models
        </p>
      </div>

      {/* Models grid */}
      <ModelsGrid models={models} title={category.displayName} />
    </div>
  );
}
