import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Category } from "@/db/schema/models";
import { categories } from "@/db/schema/models";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Maybe<Pick<Category, "displayName">>> => {
    "use cache";
    cacheTag("categories", `category-${slug}`);
    cacheLife("max");

    const { data, error } = await tryCatch(async () => {
      const foundCategory = await db
        .select({ displayName: categories.displayName })
        .from(categories)
        .where(eq(categories.slug, slug))
        .limit(1);

      return foundCategory.at(0);
    });

    if (error) {
      throw new Error("Failed to load category");
    }

    if (!data) {
      return null;
    }

    return data;
  },
);
