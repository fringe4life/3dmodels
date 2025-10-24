import { connection } from "next/server";
import { Suspense } from "react";
import ModelsGrid, {
  ModelsGridSkeleton,
} from "@/features/models/components/models-grid";
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
  return <ModelsGrid models={models} title="3D Models" />;
}

export default function ResultsPage({ searchParams }: PageProps<"/3d-models">) {
  return (
    <Suspense fallback={<ModelsGridSkeleton />}>
      <ResultsContent searchParams={searchParams} />
    </Suspense>
  );
}
