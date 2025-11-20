import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { Category } from "@/db/schema/models";
import { categories } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";

export const getAllCategories = async (): Promise<Category[]> => {
  "use cache";
  cacheLife("max");
  cacheTag("categories");

  const { data, error } = await tryCatch(
    async () => await db.select().from(categories),
  );

  if (!data || error) {
    return [];
  }

  return data;
};
