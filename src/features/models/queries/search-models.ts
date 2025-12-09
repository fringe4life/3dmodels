import { and, count, eq, ilike, or, type SQL } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import type { PaginationType } from "@/features/pagination/pagination-search-params";
import type { DatabaseQueryResult } from "@/features/pagination/types";
import type { Maybe } from "@/types";
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

  let whereCondition: Maybe<SQL>;

  if (category) {
    // Search in both name and description, filtered by category
    whereCondition = and(
      eq(models.categorySlug, category),
      or(
        ilike(models.name, searchPattern),
        ilike(models.description, searchPattern),
      ),
    );
  } else {
    // Search in both name and description across all categories
    whereCondition = or(
      ilike(models.name, searchPattern),
      ilike(models.description, searchPattern),
    );
  }

  const [{ data: items }, { data: totalRows }] = await Promise.all([
    tryCatch(() =>
      db
        .select()
        .from(models)
        .where(whereCondition)
        .orderBy(models.name)
        .limit(pagination.limit)
        .offset(pagination.page * pagination.limit),
    ),
    tryCatch(() =>
      db
        .select({ value: count(models.slug).mapWith(Number) })
        .from(models)
        .where(whereCondition),
    ),
  ]);

  return {
    items,
    totalRows,
  };
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

  let whereCondition: Maybe<SQL>;
  if (category) {
    whereCondition = eq(models.categorySlug, category);
  }

  const [{ data: items }, { data: totalRows }] = await Promise.all([
    tryCatch(async () => {
      const baseQuery = db
        .select()
        .from(models)
        .orderBy(models.name)
        .limit(pagination.limit)
        .offset(pagination.page * pagination.limit);
      return whereCondition
        ? await baseQuery.where(whereCondition)
        : await baseQuery;
    }),
    tryCatch(async () => {
      const baseQuery = db
        .select({
          value: count(models.slug).mapWith(Number),
        })
        .from(models);
      return whereCondition
        ? await baseQuery.where(whereCondition)
        : await baseQuery;
    }),
  ]);

  return {
    items,
    totalRows,
  };
};
