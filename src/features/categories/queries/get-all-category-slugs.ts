import { cache } from "react";
import { db } from "@/db";
import { categories } from "@/db/schema/models";

export const getAllCategorySlugs = cache(
  async (): Promise<{ categoryName: string }[]> => {
    try {
      const result = await db
        .select({ slug: categories.slug })
        .from(categories);
      return result.map((category) => ({ categoryName: category.slug }));
    } catch {
      throw new Error("Failed to fetch category slugs from database");
    }
  },
);
