import { and, count, eq, ilike, or, type SQL, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import type { SearchParams } from "nuqs/server";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import type { Maybe, PaginatedResult } from "@/types";
import { tryCatch } from "@/utils/try-catch";
import {
  type PaginationType,
  searchParamsCache,
} from "../pagination-search-params";
import { modelsSearchParamsCache } from "../search-params";
// Optimized search function that doesn't fetch like status
export const searchModels = async (
  query: string,
  pagination: PaginationType,
  category?: string,
): Promise<PaginatedResult<Model>> => {
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

  const list = items ?? null;
  const totalCount = totalRows?.[0]?.value ?? 0;
  const hasNextPage = (pagination.page + 1) * pagination.limit < totalCount;
  const nextCursor = hasNextPage ? String(pagination.page + 1) : null;

  return {
    list,
    metadata: {
      count: totalCount,
      hasNextPage,
      nextCursor,
    },
  };
};

// Get models by category without like status (for search)
export const getModelsByCategoryForSearch = async (
  category: string,
): Promise<Maybe<Model[]>> => {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
  // Set cache life to default (1 hour)
  cacheLife("default");

  const { data, error } = await tryCatch(
    async () =>
      await db
        .select()
        .from(models)
        .where(eq(models.categorySlug, category))
        .orderBy(models.name),
  );
  if (!data || error || data.length === 0) {
    return null;
  }
  return data;
};

// Get all models for search (without like status)
export const getModelsForSearch = async (
  pagination: PaginationType,
): Promise<PaginatedResult<Model>> => {
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

  const list = items ?? null;
  const totalCount = totalRows?.[0]?.value ?? 0;
  const hasNextPage = (pagination.page + 1) * pagination.limit < totalCount;
  const nextCursor = hasNextPage ? String(pagination.page + 1) : null;

  return {
    list,
    metadata: {
      count: totalCount,
      hasNextPage,
      nextCursor,
    },
  };
};

// Advanced search with sorting
export async function searchModelsAdvanced(
  query?: string,
  category?: string,
  sortBy?: "name" | "likes" | "dateAdded",
): Promise<Maybe<Model[]>> {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
  // Set cache life to default (1 hour)
  cacheLife("default");

  let whereCondition: Maybe<SQL>;

  if (query && category) {
    // Search with category filter
    const searchPattern = `%${query}%`;
    whereCondition = and(
      eq(models.categorySlug, category),
      or(
        ilike(models.name, searchPattern),
        ilike(models.description, searchPattern),
      ),
    );
  } else if (query) {
    // Search across all categories
    const searchPattern = `%${query}%`;
    whereCondition = or(
      ilike(models.name, searchPattern),
      ilike(models.description, searchPattern),
    );
  } else if (category) {
    // Filter by category only
    whereCondition = eq(models.categorySlug, category);
  }

  // Build base query
  const baseQuery = whereCondition
    ? db.select().from(models).where(whereCondition)
    : db.select().from(models);

  const { data, error } = await tryCatch(async () => {
    // Apply sorting
    switch (sortBy) {
      case "likes":
        return await baseQuery.orderBy(sql`${models.likes} DESC`);
      case "dateAdded":
        return await baseQuery.orderBy(sql`${models.dateAdded} DESC`);
      default:
        return await baseQuery.orderBy(models.name);
    }
  });
  if (!data || data.length === 0 || error) {
    return null;
  }
  return data;
}

export async function getModels(searchParams: Promise<SearchParams>) {
  const search = await searchParams;
  const { query } = modelsSearchParamsCache.parse(search);
  const pagination = searchParamsCache.parse(search);
  return query
    ? await searchModels(query, pagination)
    : await getModelsForSearch(pagination);
}
