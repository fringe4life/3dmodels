import { and, eq } from "drizzle-orm";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema";
import { likes, models } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { ModelWithLike } from "@/types";

type GetModelsParams = {
  category?: string;
};

export const getModels = cache(
  async ({ category }: GetModelsParams = {}): Promise<ModelWithLike[]> => {
    "use cache";

    cacheTag("models");
    cacheLife("hours");

    try {
      let session = null;
      let userId = null as string | null;

      try {
        session = await auth();
        userId = session?.user?.id ?? null;
      } catch {
        // Auth not available during static generation, proceed without user context
      }

      let allModels: Model[];

      if (category) {
        allModels = await db
          .select()
          .from(models)
          .where(eq(models.categorySlug, category));
      } else {
        allModels = await db.select().from(models);
      }

      const modelsWithLikes = await Promise.all(
        allModels.map(async (model) => {
          let hasLiked = false;

          if (userId) {
            const existingLike = await db
              .select()
              .from(likes)
              .where(and(eq(likes.userId, userId), eq(likes.modelId, model.id)))
              .limit(1);

            hasLiked = existingLike.length > 0;
          }

          return { ...model, hasLiked } as ModelWithLike;
        }),
      );

      return modelsWithLikes;
    } catch (error) {
      console.error("Error fetching models:", error);
      throw new Error("Failed to fetch models from database");
    }
  },
);
