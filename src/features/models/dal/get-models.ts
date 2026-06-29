import { connection } from "next/server";
import type { SearchParams } from "nuqs/server";
import type { CategorySlug } from "@/db/brands";
import { getUser } from "@/features/auth/queries/get-user";
import type { IsAuthenticated } from "@/features/auth/types";
import { searchModels } from "@/features/models/dal/search-models";
import { DEFAULT_HAS_LIKED } from "@/features/models/likes/constants";
import { getLikedSlugsForUser } from "@/features/models/likes/queries/like-status";
import type { ModelWithLikeStatus } from "@/features/models/types";
import { searchParamsCache } from "@/features/pagination/pagination-search-params";
import type { PaginatedResult } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";

interface GetModelsReturn extends IsAuthenticated {
  result: PaginatedResult<ModelWithLikeStatus>;
}

export const getModels = async (
  searchParams: Promise<SearchParams>,
  category?: CategorySlug,
): Promise<GetModelsReturn> => {
  await connection();
  const search = await searchParams;
  const { query, ...pagination } = searchParamsCache.parse(search);

  const [result, auth] = await Promise.all([
    searchModels(query ?? undefined, pagination, category),
    getUser(),
  ]);
  // paginate the items
  const paginatedResult = transformToPaginatedResult(result, pagination);

  // if error or empty, return the result
  if (paginatedResult.type !== "success") {
    return { result: paginatedResult, isAuthenticated: auth.isAuthenticated };
  }

  let likedSlugs: Set<string> | null = null;
  // only map over the items or do the query if the user is authenticated
  if (auth.isAuthenticated) {
    const slugs = paginatedResult.items.map((m) => m.slug);
    likedSlugs = await getLikedSlugsForUser(auth.user.id, slugs);
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
    isAuthenticated: auth.isAuthenticated,
  };
};
