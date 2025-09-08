import type { Metadata } from "next";
import {
  getAllCategories,
  getCategoryBySlug,
} from "@/features/categories/queries/categories";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { getModelsStatic } from "@/features/models/queries/models";

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    categoryName: category.slug,
  }));
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
  const models = await getModelsStatic({ category: categoryName });

  return <ModelsGrid title={category.displayName} models={models} />;
}
