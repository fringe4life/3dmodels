import { and, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";

export type LikeStatusOfModel = Awaited<
  ReturnType<typeof getLikeStatusOfModel>
>;

export async function getLikeStatusOfModel(modelSlug: string, userId?: string) {
  "use cache";
  cacheTag(`model-${modelSlug}`, `user-${userId}`);
  cacheLife("seconds");

  // Fetch likes count from the model
  const model = await db
    .select({ likes: models.likes })
    .from(models)
    .where(eq(models.slug, modelSlug))
    .limit(1);

  if (model.length === 0) {
    throw new Error(`Model with slug ${modelSlug} not found`);
  }

  const likesCount = model[0].likes;

  let hasLiked = false;

  if (userId) {
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)))
      .limit(1);

    hasLiked = existingLike.length > 0;
  }

  return { modelSlug, hasLiked, likesCount };
}
