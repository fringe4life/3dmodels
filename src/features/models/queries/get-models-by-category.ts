import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";
export const getModelsByCategory = cache(
  async (category: string): Promise<Model[] | null> => {
    "use cache";

    cacheTag("models", `models-category-${category}`);
    cacheLife("hours");

    const { data, error } = await tryCatch(
      async () =>
        await db.select().from(models).where(eq(models.categorySlug, category)),
    );
    if (!data || error) {
      return null;
    }
    return data;
  },
);
