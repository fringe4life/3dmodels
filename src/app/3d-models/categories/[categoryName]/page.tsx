import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Stream from "@/components/streamable";
import { CATEGORY_NOT_FOUND } from "@/features/categories/constants";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { ResultsContent } from "@/features/models/components/results-content";

export async function generateStaticParams() {
  return await getAllCategorySlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> {
  const { categoryName } = await params;

  const category = await getCategoryBySlug(categoryName);
  if (!category) {
    return CATEGORY_NOT_FOUND;
  }

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
  searchParams,
}: PageProps<"/3d-models/categories/[categoryName]">) {
  const { categoryName } = await params;

  const category = await getCategoryBySlug(categoryName);

  if (!category) {
    return notFound();
  }

  return (
    <Stream
      fallback={<ModelsGridSkeleton />}
      value={ResultsContent({
        category: categoryName,
        categoryDisplayName: category.displayName,
        searchParams,
      })}
    >
      {(content) => content}
    </Stream>
  );
}
