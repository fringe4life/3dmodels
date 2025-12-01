import { connection } from "next/server";
import type { SearchParams } from "nuqs/server";
import {
  getModelsForSearch,
  searchModels,
} from "@/features/models/queries/search-models";
import { modelsSearchParamsCache } from "@/features/models/search-params";
import { searchParamsCache } from "@/features/pagination/pagination-search-params";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";

export async function getModels(
  searchParams: Promise<SearchParams>,
  category?: string,
) {
  await connection();
  const search = await searchParams;
  const { query } = modelsSearchParamsCache.parse(search);
  const pagination = searchParamsCache.parse(search);

  const dbResult = query
    ? await searchModels(query, pagination, category)
    : await getModelsForSearch(pagination, category);

  return transformToPaginatedResult(dbResult, pagination);
}
