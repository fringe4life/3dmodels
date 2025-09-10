import { eq } from "drizzle-orm";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema";
import { models } from "@/db/schema";

export const getModelById = cache(
  async (id: string | number): Promise<Model> => {
    "use cache";

    const modelId = typeof id === "string" ? parseInt(id, 10) : id;

    cacheTag("models", `model-${modelId}`);
    cacheLife("hours");

    try {
      if (Number.isNaN(modelId)) {
        throw new Error(`Invalid model id: ${id}`);
      }

      const foundModel = await db
        .select()
        .from(models)
        .where(eq(models.id, modelId))
        .limit(1);

      if (foundModel.length === 0) {
        throw new Error(`Model with id ${id} not found`);
      }

      return foundModel[0];
    } catch (error) {
      console.error("Error fetching model by id:", error);
      throw error;
    }
  },
);
