import ModelsGrid from "@/app/components/ModelsGrid";
import { getCategoryBySlug } from "@/app/lib/categories";
import { getModels } from "@/app/lib/models";

export default async function CategoryPage({
  params,
}: PageProps<"/3d-models/categories/[categoryName]">) {
  const { categoryName } = await params;
  const category = await getCategoryBySlug(categoryName);
  const models = await getModels({ category: categoryName });

  return <ModelsGrid title={category.displayName} models={models} />;
}
