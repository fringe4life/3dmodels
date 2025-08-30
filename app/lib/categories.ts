import { eq } from "drizzle-orm";
import { db } from "../db";
import type { Category } from "../db/schema";
import { categories } from "../db/schema";
import { categoriesCache } from "./cache";

export async function getAllCategories(): Promise<Category[]> {
  try {
    // Check cache first
    const cachedCategories = categoriesCache.get();
    if (cachedCategories) {
      return cachedCategories;
    }

    // Fetch from database if cache is stale or empty
    const allCategories = await db.select().from(categories);

    // Update cache
    categoriesCache.set(allCategories);

    return allCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories from database");
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  try {
    // Check cache first
    const cachedCategories = categoriesCache.get();
    if (cachedCategories) {
      const foundCategory = cachedCategories.find((cat) => cat.slug === slug);
      if (foundCategory) {
        return foundCategory;
      }
      throw new Error(`Category with slug ${slug} not found`);
    }

    // Fall back to database query if cache is stale or empty
    const foundCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    if (foundCategory.length === 0) {
      throw new Error(`Category with slug ${slug} not found`);
    }

    return foundCategory[0];
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    throw error;
  }
}

export async function getDisplayNameFromSlug(slug: string): Promise<string> {
  const category = await getCategoryBySlug(slug);
  return category?.displayName || "";
}

export function clearCategoriesCache(): void {
  categoriesCache.clear();
}
