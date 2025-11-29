import { and, count, eq, ilike, or, type SQL } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import type { SearchParams } from "nuqs/server";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import type { DatabaseQueryResult } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";
import {
  type PaginationType,
  searchParamsCache,
} from "../../pagination/pagination-search-params";
import { modelsSearchParamsCache } from "../search-params";

// Optimized search function that doesn't fetch like status
export const searchModels = async (
  query: string,
  pagination: PaginationType,
  category?: string,
): Promise<DatabaseQueryResult<Model>> => {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
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
    tryCatch(
      async () =>
        await db
          .select()
          .from(models)
          .where(whereCondition)
          .orderBy(models.name)
          .limit(pagination.limit)
          .offset(pagination.page * pagination.limit),
    ),
    tryCatch(
      async () =>
        await db
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
): Promise<DatabaseQueryResult<Model>> => {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
  // Set cache life to default (1 hour)
  cacheLife("default");

  const [{ data: items }, { data: totalRows }] = await Promise.all([
    tryCatch(
      async () =>
        await db
          .select()
          .from(models)
          .orderBy(models.name)
          .limit(pagination.limit)
          .offset(pagination.page * pagination.limit),
    ),
    tryCatch(
      async () =>
        await db
          .select({ value: count(models.slug).mapWith(Number) })
          .from(models),
    ),
  ]);

  return {
    items,
    totalRows,
  };
};

export async function getModels(searchParams: Promise<SearchParams>) {
  const search = await searchParams;
  const { query } = modelsSearchParamsCache.parse(search);
  const pagination = searchParamsCache.parse(search);

  const dbResult = query
    ? await searchModels(query, pagination)
    : await getModelsForSearch(pagination);

  return transformToPaginatedResult(dbResult, pagination);
}
