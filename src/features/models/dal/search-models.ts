import { cacheLife, cacheTag } from "next/cache";
import { cacheSignal } from "react";
import { ABORT_TIMEOUT_MS } from "@/constants";
import type { CategorySlug } from "@/db/brands";
import type { Model } from "@/db/schema/models";
import { getModelsCount } from "@/features/models/queries/get-models-count";
import { getModelsList } from "@/features/models/queries/get-models-list";
import type { Sort } from "@/features/models/sort/brands";
import { paginateItems } from "@/features/pagination/dal/paginate-items";
import type {
  PaginationType,
  RawPaginatedResult,
} from "@/features/pagination/types";
import type { Maybe } from "@/types";
import { toCombinedAbortSignal, withAbort } from "@/utils/with-abort";

// Optimized search function that doesn't fetch like status
export const searchModels = async (
  query: Exclude<Maybe<string>, null>,
  pagination: PaginationType,
  sort: Sort,
  category?: CategorySlug,
): Promise<RawPaginatedResult<Model>> => {
  "use cache: remote";

  // Set cache tags for revalidation control
  cacheTag("models");
  if (category) {
    cacheTag(`models-category-${category}`);
  }
  // Set cache life to default (1 hour)
  cacheLife("default");
  const searchPattern = query ? `%${query}%` : undefined;

  const signal = toCombinedAbortSignal(
    cacheSignal(),
    AbortSignal.timeout(ABORT_TIMEOUT_MS),
  );

  const result = await withAbort(
    paginateItems({
      getItems: () =>
        getModelsList({ category, pagination, searchPattern, sort }),
      getItemsCount: () => getModelsCount({ category, searchPattern }),
    }),
    signal,
  );

  return result satisfies RawPaginatedResult<Model>;
};
