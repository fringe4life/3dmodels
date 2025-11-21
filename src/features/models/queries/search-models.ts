import { and, eq, ilike, or, type SQL, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";
// Optimized search function that doesn't fetch like status
export const searchModels = async (
  query: string,
  category?: string,
): Promise<Model[]> => {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
  // Set cache life to default (1 hour)
  cacheLife("default");

  const searchPattern = `%${query}%`;

  let whereCondition: SQL | undefined;

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
  const { data, error } = await tryCatch(
    async () =>
      await db.select().from(models).where(whereCondition).orderBy(models.name),
  );
  if (!data || error) {
    return [];
  }
  return data;
};

// Get models by category without like status (for search)
export const getModelsByCategoryForSearch = async (
  category: string,
): Promise<Model[]> => {
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
  if (!data || error) {
    return [];
  }
  return data;
};

// Get all models for search (without like status)
export const getAllModelsForSearch = async (): Promise<Model[]> => {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
  // Set cache life to default (1 hour)
  cacheLife("default");

  const { data, error } = await tryCatch(
    async () => await db.select().from(models).orderBy(models.name),
  );
  if (!data || error) {
    return [];
  }
  return data;
};

// Advanced search with sorting
export async function searchModelsAdvanced(
  query?: string,
  category?: string,
  sortBy?: "name" | "likes" | "dateAdded",
): Promise<Model[]> {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
  // Set cache life to default (1 hour)
  cacheLife("default");

  let whereCondition: SQL | undefined;

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
  if (!data || error) {
    return [];
  }
  return data;
}
