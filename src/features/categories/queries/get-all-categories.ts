import { unstable_cacheTag as cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Category } from "@/db/schema";
import { categories } from "@/db/schema";

export const getAllCategories = cache(async (): Promise<Category[]> => {
  "use cache";

  cacheTag("categories");

  try {
    const allCategories = await db.select().from(categories);
    return allCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories from database");
  }
});
