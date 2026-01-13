import { connection } from "next/server";
import type { SearchParams } from "nuqs/server";
import type { Model } from "@/db/schema/models";
import { getUser } from "@/features/auth/queries/get-user";
import { searchModels } from "@/features/models/dal/search-models";
import { getHasLikedStatus } from "@/features/models/queries/get-model-with-like-status";
import { modelsSearchParamsCache } from "@/features/models/search-params";
import { searchParamsCache } from "@/features/pagination/pagination-search-params";
import type { PaginatedResult } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";
import type { HasLiked } from "../types";

export interface ModelWithLikeStatus extends Model {
  hasLikedPromise: Promise<HasLiked>;
}

export const getModels = async (
  searchParams: Promise<SearchParams>,
  category?: string,
): Promise<PaginatedResult<ModelWithLikeStatus>> => {
  await connection();
  const search = await searchParams;
  const { query } = modelsSearchParamsCache.parse(search);
  const pagination = searchParamsCache.parse(search);

  const result = await searchModels(query ?? undefined, pagination, category);
  const paginatedResult = transformToPaginatedResult(result, pagination);

  if (paginatedResult.type === "error" || paginatedResult.type === "empty") {
    return paginatedResult;
  }

  // Get user for like status
  const user = await getUser();
  const userId = user?.id;

  // Add hasLikedPromise to each model
  const itemsWithLikeStatus = paginatedResult.items.map((model) => {
    const hasLikedPromise = userId
      ? getHasLikedStatus(model.slug, userId)
      : Promise.resolve({ slug: model.slug, hasLiked: false });

    return {
      ...model,
      hasLikedPromise,
    };
  });

  return {
    ...paginatedResult,
    items: itemsWithLikeStatus,
  };
};
