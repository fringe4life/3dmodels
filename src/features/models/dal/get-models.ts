import { connection } from "next/server";
import type { SearchParams } from "nuqs/server";
import type { CategorySlug } from "@/db/brands";
import { searchModels } from "@/features/models/dal/search-models";
import { getLikedSlugsForUser } from "@/features/models/likes/queries/like-status";
import { withLikeStatuses } from "@/features/models/likes/with-like-status";
import { searchParamsCache } from "@/features/models/listing-search-params";
import { toSort } from "@/features/models/sort/brands";
import type { ModelWithLikeStatus } from "@/features/models/types";
import { getUser } from "@/lib/auth/get-user";
import type { IsAuthenticated } from "@/lib/auth/types";
import type { PaginatedResult } from "@/lib/pagination/types";
import { transformToPaginatedResult } from "@/lib/pagination/utils/to-paginated-result";
import type { Prettify } from "@/types";

type GetModelsReturn = Prettify<
  IsAuthenticated & {
    query: string;
    result: PaginatedResult<ModelWithLikeStatus>;
  }
>;

export const getModels = async (
  searchParams: Promise<SearchParams>,
  category?: CategorySlug,
): Promise<GetModelsReturn> => {
  await connection();
  const search = await searchParams;
  const { query, sort, ...pagination } = searchParamsCache.parse(search);
  const resolvedSort = toSort(sort);

  const [result, auth] = await Promise.all([
    searchModels(query, pagination, resolvedSort, category),
    getUser(),
  ]);
  // paginate the items
  const paginatedResult = transformToPaginatedResult(result, pagination);

  // if error or empty, return the result
  if (paginatedResult.type !== "success") {
    return {
      isAuthenticated: auth.isAuthenticated,
      query,
      result: paginatedResult,
    };
  }

  let likedSlugs: Set<string> | null = null;
  // only map over the items or do the query if the user is authenticated
  if (auth.isAuthenticated) {
    const slugs = paginatedResult.items.map((m) => m.slug);
    likedSlugs = await getLikedSlugsForUser(auth.user.id, slugs);
  }

  // apply the liked slugs to the items do this even
  // for non authenticated users to avoid subtle bugs
  const itemsWithLikeStatus = withLikeStatuses(
    paginatedResult.items,
    likedSlugs,
  );

  return {
    isAuthenticated: auth.isAuthenticated,
    query,
    result: {
      ...paginatedResult,
      items: itemsWithLikeStatus,
    },
  };
};
