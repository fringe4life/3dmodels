import Stream from "@/components/streamable";
import ModelsGrid from "@/features/models/components/models-grid";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import ModelsNotFound from "@/features/models/components/models-not-found";
import { getModels } from "@/features/models/queries/search-models";
import ModelsPagination from "@/features/pagination/components/nuqs-pagination";
import type { SearchParamsProps } from "@/types";

async function ResultsContent({ searchParams }: SearchParamsProps) {
  const result = await getModels(searchParams);
  if (!result.list || result.list.length === 0) {
    return <ModelsNotFound />;
  }
  return (
    <div className="space-y-4">
      <ModelsGrid models={result.list} title="3D Models" />
      <ModelsPagination metadata={result.metadata} />
    </div>
  );
}

export default function ResultsPage({ searchParams }: PageProps<"/3d-models">) {
  return (
    <Stream
      fallback={<ModelsGridSkeleton />}
      value={ResultsContent({ searchParams })}
    >
      {(content) => content}
    </Stream>
  );
}
