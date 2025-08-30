import { eq } from "drizzle-orm";
import { db } from "@/app/db";
import type { Model } from "@/app/db/schema";
import { models } from "@/app/db/schema";

type GetModelsParams = {
  category?: string;
};

export async function getModels({
  category,
}: GetModelsParams = {}): Promise<Model[]> {
  try {
    if (category) {
      // Filter by category if provided
      const filteredModels = await db
        .select()
        .from(models)
        .where(eq(models.categorySlug, category));
      return filteredModels;
    } else {
      // Get all models if no category filter
      const allModels = await db.select().from(models);
      return allModels;
    }
  } catch (error) {
    console.error("Error fetching models:", error);
    throw new Error("Failed to fetch models from database");
  }
}

export async function getModelById(id: string | number): Promise<Model> {
  try {
    const modelId = typeof id === "string" ? parseInt(id, 10) : id;

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
}
