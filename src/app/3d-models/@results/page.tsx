import { unstable_cacheLife as cacheLife } from "next/cache";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import {
  getAllModelsForSearch,
  searchModels,
} from "@/features/models/queries/search-models";
import { modelsSearchParamsCache } from "@/features/models/search-params";

async function getModelsForQuery(query: string) {
  "use cache";
  cacheLife("hours");
  const models = query
    ? await searchModels(query)
    : await getAllModelsForSearch();
  return models;
}

export default async function ResultsPage({
  searchParams,
}: PageProps<"/3d-models">) {
  const { query } = await modelsSearchParamsCache.parse(searchParams);
  const models = await getModelsForQuery(query);
  return <ModelsGrid title="3D Models" models={models} />;
}
