import { connection } from "next/server";
import Stream from "@/components/streamable";
import ModelsGrid from "@/features/models/components/models-grid";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import ModelsNotFound from "@/features/models/components/models-not-found";
import {
  getAllModelsForSearch,
  searchModels,
} from "@/features/models/queries/search-models";
import { modelsSearchParamsCache } from "@/features/models/search-params";

async function getModelsForQuery(query: string) {
  const models = query
    ? await searchModels(query)
    : await getAllModelsForSearch();
  return models;
}

type ResultsContentProps = {
  searchParams: PageProps<"/3d-models">["searchParams"];
};

async function ResultsContent({ searchParams }: ResultsContentProps) {
  await connection();
  const search = await searchParams;
  const { query } = modelsSearchParamsCache.parse(search);
  const models = await getModelsForQuery(query);
  if (!models) {
    return <ModelsNotFound />;
  }
  return <ModelsGrid models={models} title="3D Models" />;
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
