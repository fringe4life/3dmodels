import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_NOT_FOUND } from "@/features/categories/constants";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import ResultsContent from "@/features/models/components/models-view";

export const generateStaticParams = async () => await getAllCategorySlugs();

export const generateMetadata = async ({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> => {
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
};

const CategoryPage = async ({
  params,
  searchParams,
}: PageProps<"/3d-models/categories/[categoryName]">) => {
  const { categoryName } = await params;

  const category = await getCategoryBySlug(categoryName);

  if (!category) {
    return notFound();
  }

  return (
    <ResultsContent
      category={categoryName}
      categoryDisplayName={category.displayName}
      searchParams={searchParams}
    />
  );
};

export default CategoryPage;
