import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Stream from "@/components/streamable";
import CategoriesHeader from "@/features/categories/components/categories-header";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import ModelsGrid from "@/features/models/components/models-grid";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import ModelsNotFound from "@/features/models/components/models-not-found";
import ModelsPagination from "@/features/models/components/models-pagination";
import { getCategoryModels } from "@/features/models/queries/get-models-by-category";
import type { SearchParamsProps } from "@/types";

export async function generateStaticParams() {
  return await getAllCategorySlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> {
  const { categoryName } = await params;

  const category = await getCategoryBySlug(categoryName);
  if (!category) {
    return notFound();
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

type CategoryResultsProps = {
  categoryName: string;
  categoryDisplayName: string;
} & SearchParamsProps;

async function CategoryResultsContent({
  categoryName,
  categoryDisplayName,
  searchParams,
}: CategoryResultsProps) {
  await connection();

  const result = await getCategoryModels(categoryName, searchParams);
  if (!result.list || result.list.length === 0) {
    return <ModelsNotFound />;
  }

  return (
    <div className="space-y-4">
      <ModelsGrid models={result.list} title={categoryDisplayName} />
      <ModelsPagination metadata={result.metadata} />
    </div>
  );
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
    <>
      <CategoriesHeader category={category} />
      <Stream
        fallback={<ModelsGridSkeleton />}
        value={CategoryResultsContent({
          categoryName,
          categoryDisplayName: category.displayName,
          searchParams,
        })}
      >
        {(content) => content}
      </Stream>
    </>
  );
}
