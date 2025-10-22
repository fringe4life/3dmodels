import { and, eq, ilike, or, type SQL, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";

// Optimized search function that doesn't fetch like status
export const searchModels = cache(
  async (query: string, category?: string): Promise<Model[]> => {
    "use cache";

    // Set cache tags for revalidation control
    cacheTag("models");
    // Set cache life to default (1 hour)
    cacheLife("default");

    try {
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

      return await db
        .select()
        .from(models)
        .where(whereCondition)
        .orderBy(models.name);
    } catch {
      throw new Error("Failed to search models");
    }
  },
);

// Get models by category without like status (for search)
export const getModelsByCategoryForSearch = cache(
  async (category: string): Promise<Model[]> => {
    "use cache";

    // Set cache tags for revalidation control
    cacheTag("models");
    // Set cache life to default (1 hour)
    cacheLife("default");

    try {
      return await db
        .select()
        .from(models)
        .where(eq(models.categorySlug, category))
        .orderBy(models.name);
    } catch {
      throw new Error("Failed to fetch models by category for search");
    }
  },
);

// Get all models for search (without like status)
export const getAllModelsForSearch = cache(async (): Promise<Model[]> => {
  "use cache";

  // Set cache tags for revalidation control
  cacheTag("models");
  // Set cache life to default (1 hour)
  cacheLife("default");

  try {
    return await db.select().from(models).orderBy(models.name);
  } catch {
    throw new Error("Failed to fetch all models for search");
  }
});

// Advanced search with sorting
export const searchModelsAdvanced = cache(
  async (
    query?: string,
    category?: string,
    sortBy?: "name" | "likes" | "dateAdded",
  ): Promise<Model[]> => {
    "use cache";

    // Set cache tags for revalidation control
    cacheTag("models");
    // Set cache life to default (1 hour)
    cacheLife("default");

    try {
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

      // Apply sorting
      switch (sortBy) {
        case "likes":
          return await baseQuery.orderBy(sql`${models.likes} DESC`);
        case "dateAdded":
          return await baseQuery.orderBy(sql`${models.dateAdded} DESC`);
        default:
          return await baseQuery.orderBy(models.name);
      }
    } catch {
      throw new Error("Failed to perform advanced search");
    }
  },
);
