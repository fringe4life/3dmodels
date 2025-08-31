import { and, eq, sql } from "drizzle-orm";
import type { ModelWithLike } from "@/actions/likes";
import { db } from "@/db";
import type { Model } from "@/db/schema";
import { likes, models } from "@/db/schema";
import { auth } from "@/lib/auth";

type GetModelsParams = {
  category?: string;
};

export async function getModels({
  category,
}: GetModelsParams = {}): Promise<ModelWithLike[]> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    let allModels: Model[];

    if (category) {
      allModels = await db
        .select()
        .from(models)
        .where(eq(models.categorySlug, category));
    } else {
      allModels = await db.select().from(models);
    }

    // Add hasLiked property for each model
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

        return { ...model, hasLiked };
      }),
    );

    return modelsWithLikes;
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
