import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoriesBlockTransition } from "@/features/categories/components/categories-block-transition";
import { CATEGORY_NOT_FOUND } from "@/features/categories/constants";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import { ModelsView } from "@/features/models/components/models-view";
import { canonicalPathForListing } from "@/features/pagination/listing-canonical";

export const generateStaticParams = async () => await getAllCategorySlugs();

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> => {
  const { categoryName } = await params;

  const category = await getCategoryBySlug(categoryName);
  if (!category) {
    return CATEGORY_NOT_FOUND;
  }

  const pathname = `/3d-models/categories/${categoryName}`;
  const canonical = await canonicalPathForListing(pathname, searchParams);

  return {
    title: category.displayName,
    description: `Browse ${category.displayName} 3D printing models. Find STL files for your next ${category.displayName.toLowerCase()} project.`,
    alternates: { canonical },
    openGraph: {
      title: `${category.displayName} 3D Models`,
      description: `Browse ${category.displayName} 3D printing models. Find STL files for your next ${category.displayName.toLowerCase()} project.`,
      url: canonical,
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
    throw notFound();
  }

  return (
    <CategoriesBlockTransition categoryName={categoryName}>
      <ModelsView
        category={categoryName}
        categoryDisplayName={category.displayName}
        searchParams={searchParams}
      />
    </CategoriesBlockTransition>
  );
};

export default CategoryPage;
