import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import { NuqsAdapterBoundary } from "@/components/nuqs/nuqs-adapter-boundary";
import { isCategorySlug } from "@/db/brands";
import { CategoriesBlockTransition } from "@/features/categories/components/categories-block-transition";
import { CATEGORY_NOT_FOUND } from "@/features/categories/constants";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import { ModelsView } from "@/features/models/components/models-view";
import { canonicalPathForListing } from "@/features/pagination/listing-canonical";
// fallow-ignore-next-line unused-export
export const prefetch = "allow-runtime";
export const generateStaticParams = async () => await getAllCategorySlugs();

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> => {
  const { categoryName } = await params;

  if (!isCategorySlug(categoryName)) {
    return CATEGORY_NOT_FOUND;
  }

  const category = await getCategoryBySlug(categoryName);
  if (!category) {
    return CATEGORY_NOT_FOUND;
  }

  const pathname: Route = `/3d-models/categories/${categoryName}`;
  const canonical = await canonicalPathForListing(pathname, searchParams);

  return {
    alternates: { canonical },
    description: `Browse ${category.displayName} 3D printing models. Find STL files for your next ${category.displayName.toLowerCase()} project.`,
    openGraph: {
      description: `Browse ${category.displayName} 3D printing models. Find STL files for your next ${category.displayName.toLowerCase()} project.`,
      title: `${category.displayName} 3D Models`,
      url: canonical,
    },
    title: category.displayName,
  };
};

const CategoryPage = async ({
  params,
  searchParams,
}: PageProps<"/3d-models/categories/[categoryName]">) => {
  const { categoryName } = await params;

  if (!isCategorySlug(categoryName)) {
    notFound();
  }

  const category = await getCategoryBySlug(categoryName);

  if (!category) {
    notFound();
  }

  return (
    <NuqsAdapterBoundary>
      <CategoriesBlockTransition categoryName={categoryName}>
        <ModelsView
          category={categoryName}
          categoryDisplayName={category.displayName}
          searchParams={searchParams}
        />
      </CategoriesBlockTransition>
    </NuqsAdapterBoundary>
  );
};

export default CategoryPage;
