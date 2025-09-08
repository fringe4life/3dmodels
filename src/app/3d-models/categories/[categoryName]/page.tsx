import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getAllCategories,
  getCategoryBySlug,
} from "@/features/categories/queries/categories";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { getModels } from "@/features/models/queries/models";

export const dynamicParams = false;
export const experimental_ppr = true;

// Fallback component for loading state
function CategoryPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
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

// Dynamic component that handles database operations
async function CategoryContent({ params }: PageProps<"/3d-models/categories/[categoryName]">) {
  const { categoryName } = await params;
  
  try {
    const category = await getCategoryBySlug(categoryName);
    const models = await getModels({ category: categoryName });
    return (
      <div>
        {/* Static header content */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {category.displayName} Models
          </h1>
          <p className="text-gray-600 mt-2">
            Browse our collection of {category.displayName} 3D printing models
          </p>
        </div>
        
        {/* Models grid */}
        <ModelsGrid title={category.displayName} models={models} />
      </div>
    );
  } catch (error) {
    console.error("Error in CategoryContent:", error);
    throw error;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw error;
  }
}

export default function CategoryPage(props: PageProps<"/3d-models/categories/[categoryName]">) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryContent {...props} />
    </Suspense>
  );
}
