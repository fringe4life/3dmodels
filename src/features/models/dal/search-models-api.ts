import type { Model } from "@/db/schema/models";
import { getModelsCount } from "@/features/models/queries/get-models-count";
import { getModelsList } from "@/features/models/queries/get-models-list";
import { paginateItems } from "@/features/pagination/dal/paginate-items";
import type {
  PaginationType,
  RawPaginatedResult,
} from "@/features/pagination/types";
import type { Maybe } from "@/types";

/**
 * @abstract api version to paginate items without nextjs cacheComponents
 * @param query a search query string
 * @param pagination a pagination object
 * @param category a category slug
 * @returns a raw paginated result of models with a count of items
 */
export const searchModelsAPI = async (
  query: Exclude<Maybe<string>, null>,
  pagination: PaginationType,
  category?: string,
): Promise<RawPaginatedResult<Model>> => {
  const searchPattern = query ? `%${query}%` : undefined;
  const result = await paginateItems({
    getItems: () => getModelsList({ searchPattern, category, pagination }),
    getItemsCount: () => getModelsCount({ searchPattern, category }),
  });

  return result satisfies RawPaginatedResult<Model>;
};
