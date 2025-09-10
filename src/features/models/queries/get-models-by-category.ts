import { eq } from "drizzle-orm";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema";
import { models } from "@/db/schema";

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
    } catch (error) {
      console.error("Error fetching models by category:", error);
      throw error;
    }
  },
);
