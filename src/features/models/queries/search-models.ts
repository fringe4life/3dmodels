import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import { paginateItems } from "@/features/pagination/dal/paginate-items";
import type {
  PaginationType,
  RawPaginationResult,
} from "@/features/pagination/types";
import { tryCatch } from "@/utils/try-catch";
import { getModelsCount } from "./get-models-count";
import { getModelsList } from "./get-models-list";

// Optimized search function that doesn't fetch like status
export const searchModels = async (
  query: string,
  pagination: PaginationType,
  category?: string,
): Promise<RawPaginationResult<Model>> => {
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

  return result satisfies RawPaginationResult<Model>;
};

// Get all models for search (without like status)
export const getModelsForSearch = async (
  pagination: PaginationType,
  category?: string,
): Promise<RawPaginationResult<Model>> => {
  "use cache: remote";

  // Set cache tags for revalidation control
  cacheTag("models");
  if (category) {
    cacheTag(`models-category-${category}`);
  }
  // Set cache life to default (1 hour)
  cacheLife("default");

  const [{ data: items }, { data: itemsCount }] = await Promise.all([
    tryCatch(() =>
      db.query.models.findMany({
        where: { categorySlug: { eq: category } },
        orderBy: (models, { asc }) => [asc(models.name)],
        limit: pagination.limit,
        offset: pagination.page * pagination.limit,
      }),
    ),
    tryCatch(() =>
      db.$count(
        models,
        category ? eq(models.categorySlug, category) : undefined,
      ),
    ),
  ]);

  return {
    items,
    itemsCount,
  } satisfies RawPaginationResult<Model>;
};
