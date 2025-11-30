import ModelsGrid from "@/features/models/components/models-grid";
import ModelsNotFound from "@/features/models/components/models-not-found";
import { getModels } from "@/features/models/queries/search-models";
import ModelsPagination from "@/features/pagination/components/nuqs-pagination";
import type { SearchParamsProps } from "@/types";

type ResultsContentProps = SearchParamsProps & {
  category?: string;
  categoryDisplayName?: string;
  title?: string;
};

export async function ResultsContent({
  searchParams,
  category,
  categoryDisplayName,
  title,
}: ResultsContentProps) {
  const result = await getModels(searchParams, category);
  if (!result.list || result.list.length === 0) {
    return <ModelsNotFound />;
  }

  // Determine the title: categoryDisplayName takes precedence, then title prop, default to "3D Models"
  const displayTitle = categoryDisplayName ?? title ?? "3D Models";

  return (
    <div className="space-y-4">
      <ModelsGrid models={result.list} title={displayTitle} />
      <ModelsPagination metadata={result.metadata} />
    </div>
  );
}
