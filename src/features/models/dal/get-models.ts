import { connection } from "next/server";
import type { SearchParams } from "nuqs/server";
import type { Model } from "@/db/schema/models";
import { searchModels } from "@/features/models/queries/search-models";
import { modelsSearchParamsCache } from "@/features/models/search-params";
import { searchParamsCache } from "@/features/pagination/pagination-search-params";
import type { PaginatedResult } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";

export const getModels = async (
  searchParams: Promise<SearchParams>,
  category?: string,
): Promise<PaginatedResult<Model>> => {
  await connection();
  const search = await searchParams;
  const { query } = modelsSearchParamsCache.parse(search);
  const pagination = searchParamsCache.parse(search);

  const result = await searchModels(query ?? undefined, pagination, category);

  return transformToPaginatedResult(result, pagination);
};
