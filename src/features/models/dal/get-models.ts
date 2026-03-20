import { connection } from "next/server";
import type { SearchParams } from "nuqs/server";
import { getUser } from "@/features/auth/queries/get-user";
import type { IsAuthenticated } from "@/features/auth/types";
import { searchModels } from "@/features/models/dal/search-models";
import { getLikedSlugsForUser } from "@/features/models/queries/get-model-with-like-status";
import { modelsSearchParamsCache } from "@/features/models/search-params";
import type { ModelWithLikeStatus } from "@/features/models/types";
import { searchParamsCache } from "@/features/pagination/pagination-search-params";
import type { PaginatedResult } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";
import type { Maybe } from "@/types";
import { DEFAULT_HAS_LIKED } from "../constants";

export interface GetModelsReturn {
  isAuthenticated: IsAuthenticated;
  result: PaginatedResult<ModelWithLikeStatus>;
}

export const getModels = async (
  searchParams: Promise<SearchParams>,
  category?: string,
): Promise<GetModelsReturn> => {
  await connection();
  const search = await searchParams;
  const { query } = modelsSearchParamsCache.parse(search);
  const pagination = searchParamsCache.parse(search);

  const [result, user] = await Promise.all([
    searchModels(query ?? undefined, pagination, category),
    getUser(),
  ]);
  // paginate the items
  const paginatedResult = transformToPaginatedResult(result, pagination);
  // used to determine if heart button can be clicked
  const isAuthenticated = !!user?.id;

  // if no items, or error, return the result
  if (paginatedResult.type === "error" || paginatedResult.type === "empty") {
    return { result: paginatedResult, isAuthenticated };
  }

  const userId = user?.id;
  let likedSlugs: Maybe<Set<string>> = null;
  // only map over the items or do the query if the user is authenticated
  if (userId) {
    const slugs = paginatedResult.items.map((m) => m.slug);
    likedSlugs = await getLikedSlugsForUser(userId, slugs);
  }

  // apply the liked slugs to the items do this even
  // for non authenticated users to avoid subtle bugs
  const itemsWithLikeStatus = paginatedResult.items.map((model) => ({
    ...model,
    hasLiked: likedSlugs
      ? likedSlugs.has(model.slug)
      : DEFAULT_HAS_LIKED.hasLiked,
  }));

  return {
    result: {
      ...paginatedResult,
      items: itemsWithLikeStatus,
    },
    isAuthenticated,
  };
};
