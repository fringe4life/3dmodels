import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import type { Category } from "@/db/schema";
import { categories } from "@/db/schema";

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category> => {
    "use cache";

    try {
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
  },
);
