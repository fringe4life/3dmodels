import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import type { Model } from "@/db/schema";
import { likes, models } from "@/db/schema";
import type { WithLike } from "@/types";

export async function getModelWithLikeStatus(
  id: string | number,
  userId?: string,
): Promise<WithLike<Pick<Model, "id" | "name" | "likes">>> {
  const modelId = typeof id === "string" ? Number.parseInt(id, 10) : id;

  if (Number.isNaN(modelId)) {
    throw new Error(`Invalid model id: ${id}`);
  }

  const model = await db
    .select({ id: models.id, name: models.name, likes: models.likes })
    .from(models)
    .where(eq(models.id, modelId))
    .limit(1);

  if (model.length === 0) {
    throw new Error(`Model with id ${id} not found`);
  }

  let hasLiked = false;

  if (userId) {
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.modelId, modelId)))
      .limit(1);

    hasLiked = existingLike.length > 0;
  }

  return { ...model[0], hasLiked };
}
