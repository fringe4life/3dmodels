import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Category } from "@/db/schema/models";
import { categories } from "@/db/schema/models";

export const getAllCategories = cache(async (): Promise<Category[]> => {
  "use cache";
  cacheLife("max");
  cacheTag("categories");

  try {
    const allCategories = await db.select().from(categories);
    return allCategories;
  } catch {
    throw new Error("Failed to fetch categories from database");
  }
});
