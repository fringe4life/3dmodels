import { and, eq, ilike, or } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import type {
  DatabaseQueryResult,
  PaginationType,
} from "@/features/pagination/types";
import { tryCatch } from "@/utils/try-catch";

// Optimized search function that doesn't fetch like status
export const searchModels = async (
  query: string,
  pagination: PaginationType,
  category?: string,
): Promise<DatabaseQueryResult<Model>> => {
  "use cache: remote";

  // Set cache tags for revalidation control
  cacheTag("models");
  if (category) {
    cacheTag(`models-category-${category}`);
  }
  // Set cache life to default (1 hour)
  cacheLife("default");
  const searchPattern = `%${query}%`;
  const searchWhereCondition = or(
    ilike(models.name, searchPattern),
    ilike(models.description, searchPattern),
  );
  const countWhereCondition = category
    ? and(eq(models.categorySlug, category), searchWhereCondition)
    : searchWhereCondition;

  const [{ data: items }, { data: totalRows }] = await Promise.all([
    tryCatch(() => {
      return db.query.models.findMany({
        where: {
          OR: [
            { name: { ilike: searchPattern } },
            { description: { ilike: searchPattern } },
          ],
          categorySlug: { eq: category },
        },
        orderBy: (models, { asc }) => [asc(models.name)],
        limit: pagination.limit,
        offset: pagination.page * pagination.limit,
      });
    }),
    tryCatch(() => db.$count(models, countWhereCondition)),
  ]);

  return {
    items,
    totalRows,
  } satisfies DatabaseQueryResult<Model>;
};

// Get all models for search (without like status)
export const getModelsForSearch = async (
  pagination: PaginationType,
  category?: string,
): Promise<DatabaseQueryResult<Model>> => {
  "use cache: remote";

  // Set cache tags for revalidation control
  cacheTag("models");
  if (category) {
    cacheTag(`models-category-${category}`);
  }
  // Set cache life to default (1 hour)
  cacheLife("default");

  const [{ data: items }, { data: totalRows }] = await Promise.all([
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
    totalRows,
  } satisfies DatabaseQueryResult<Model>;
};
