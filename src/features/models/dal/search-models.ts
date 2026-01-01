import { cacheLife, cacheTag } from "next/cache";
import type { Model } from "@/db/schema/models";
import { getModelsCount } from "@/features/models/queries/get-models-count";
import { getModelsList } from "@/features/models/queries/get-models-list";
import { paginateItems } from "@/features/pagination/dal/paginate-items";
import type {
  PaginationType,
  RawPaginatedResult,
} from "@/features/pagination/types";
import type { Maybe } from "@/types";

// Optimized search function that doesn't fetch like status
export const searchModels = async (
  query: Exclude<Maybe<string>, null>,
  pagination: PaginationType,
  category?: string,
): Promise<RawPaginatedResult<Model>> => {
  "use cache: remote";

  // Set cache tags for revalidation control
  cacheTag("models");
  if (category) {
    cacheTag(`models-category-${category}`);
  }
  // Set cache life to default (1 hour)
  cacheLife("default");
  const searchPattern = `%${query}%`;

  const result = await paginateItems({
    getItems: () => getModelsList({ searchPattern, category, pagination }),
    getItemsCount: () => getModelsCount({ searchPattern, category }),
  });

  return result satisfies RawPaginatedResult<Model>;
};
