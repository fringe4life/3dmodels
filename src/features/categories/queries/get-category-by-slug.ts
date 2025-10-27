import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Category } from "@/db/schema/models";
import { categories } from "@/db/schema/models";

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Pick<Category, "displayName">> => {
    "use cache";
    cacheTag("categories", `category-${slug}`);
    cacheLife("max");

    try {
      const foundCategory = await db
        .select({ displayName: categories.displayName })
        .from(categories)
        .where(eq(categories.slug, slug))
        .limit(1);

      if (foundCategory.length === 0) {
        throw new Error(`Category with slug ${slug} not found`);
      }

      return foundCategory[0];
    } catch {
      throw new Error(`Category with slug ${slug} not found`);
    }
  },
);
