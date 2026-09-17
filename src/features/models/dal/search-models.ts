import { cacheLife, cacheTag } from "next/cache";
import { cacheSignal } from "react";
import { ABORT_TIMEOUT_MS } from "@/constants";
import type { CategorySlug } from "@/db/brands";
import type { Model } from "@/db/schema/models";
import { getModelsList } from "@/features/models/queries/get-models-list";
import type { Sort } from "@/features/models/sort/brands";
import type { QueryPagination } from "@/features/models/types";
import { DEFAULT_CURSOR, DEFAULT_DIRECTION } from "@/lib/pagination/constants";
import { paginateItems } from "@/lib/pagination/dal/paginate-items";
import type {
  PaginationType,
  RawPaginatedResult,
} from "@/lib/pagination/types";
import type { Maybe } from "@/types";
import { toCombinedAbortSignal, withAbort } from "@/utils/with-abort";

export const searchModels = async (
  query: Exclude<Maybe<string>, null>,
  pagination: QueryPagination,
  sort: Sort,
  category?: CategorySlug,
): Promise<RawPaginatedResult<Model> & { pagination: PaginationType }> => {
  "use cache: remote";

  cacheTag("models");
  cacheLife("hours");
  if (category) {
    cacheTag(`models-category-${category}`);
  }
  const searchPattern = query ? `%${query}%` : undefined;

  const signal = toCombinedAbortSignal(
    cacheSignal(),
    AbortSignal.timeout(ABORT_TIMEOUT_MS),
  );

  return await withAbort(
    paginateItems({
      fallbackPagination: {
        cursor: pagination.cursor ?? DEFAULT_CURSOR,
        direction: pagination.cursor ? pagination.direction : DEFAULT_DIRECTION,
        limit: pagination.limit,
      },
      getPage: () =>
        getModelsList({ category, pagination, searchPattern, sort }),
    }),
    signal,
  );
};
