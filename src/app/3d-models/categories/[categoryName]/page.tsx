import { getCategoryBySlug } from "@/features/categories/queries/categories";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { getModels } from "@/features/models/queries/models";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">) {
  const { categoryName } = await params;
  const category = await getCategoryBySlug(categoryName);
  const models = await getModels({ category: categoryName });

  return <ModelsGrid title={category.displayName} models={models} />;
}
