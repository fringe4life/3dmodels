import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { Category } from "@/db/schema/models";
import { categories } from "@/db/schema/models";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";

export const getAllCategories = async (): Promise<Maybe<Category[]>> => {
  "use cache";
  cacheLife("max");
  cacheTag("categories");

  const { data, error } = await tryCatch(
    async () => await db.select().from(categories),
  );

  if (!data || error) {
    return null;
  }

  return data;
};
