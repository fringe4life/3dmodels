import type { Metadata } from "next";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { Suspense } from "react";
import { getAllCategories } from "@/features/categories/queries/get-all-categories";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { getModelsByCategory } from "@/features/models/queries/get-models-by-category";

// Note: dynamicParams is not compatible with experimental.cacheComponents
// With cacheComponents enabled, only paths from generateStaticParams are allowed

// Fallback component for loading state
function CategoryPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-1/4 rounded bg-gray-200"></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton items don't change order
            key={`skeleton-${i}`}
            className="h-64 rounded-lg bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await getAllCategories();


  const params = categories.map((category) => ({
    categoryName: category.slug,
  }));

  return params;
}

// Static component that handles database operations
async function CategoryContent({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">) {
  "use cache";
  cacheLife("hours");

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
      <ModelsGrid title={category.displayName} models={models} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> {
  "use cache";

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

export default function CategoryPage(
  props: PageProps<"/3d-models/categories/[categoryName]">,
) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryContent {...props} />
    </Suspense>
  );
}
