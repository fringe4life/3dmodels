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
import { DEFAULT_DIRECTION } from "@/lib/pagination/constants";
import { parsePaginationCursor } from "@/lib/pagination/parse-cursor";
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
  const { query, sort, cursor, direction, limit } =
    searchParamsCache.parse(search);
  const resolvedSort = toSort(sort);
  const parsedCursor = parsePaginationCursor(cursor);
  const pagination = {
    cursor: parsedCursor,
    direction: parsedCursor ? direction : DEFAULT_DIRECTION,
    limit,
  };

  const [result, auth] = await Promise.all([
    searchModels(query, pagination, resolvedSort, category),
    getUser(),
  ]);
  const paginatedResult = transformToPaginatedResult(result, result.pagination);

  if (paginatedResult.type !== "success") {
    return {
      isAuthenticated: auth.isAuthenticated,
      query,
      result: paginatedResult,
    };
  }

  let likedSlugs: Set<string> | null = null;
  if (auth.isAuthenticated) {
    const slugs = paginatedResult.items.map((m) => m.slug);
    likedSlugs = await getLikedSlugsForUser(auth.user.id, slugs);
  }

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
