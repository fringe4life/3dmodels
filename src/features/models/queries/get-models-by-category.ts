import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";

export const getModelsByCategory = cache(
  async (category: string): Promise<Model[]> => {
    "use cache";

    cacheTag("models", `models-category-${category}`);
    cacheLife("hours");

    try {
      return await db
        .select()
        .from(models)
        .where(eq(models.categorySlug, category));
    } catch {
      throw new Error("Failed to fetch models by category");
    }
  },
);
