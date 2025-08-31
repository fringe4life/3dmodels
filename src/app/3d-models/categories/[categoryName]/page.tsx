import type { Metadata } from "next";
import { getCategoryBySlug } from "@/features/categories/queries/categories";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { getModels } from "@/features/models/queries/models";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> {
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
  const models = await getModels({ category: categoryName });

  return <ModelsGrid title={category.displayName} models={models} />;
}
