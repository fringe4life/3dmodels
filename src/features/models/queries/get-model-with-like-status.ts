import { and, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";
export type LikeStatusOfModel = Awaited<
  ReturnType<typeof getLikeStatusOfModel>
>;

export async function getLikeStatusOfModel(modelSlug: string, userId?: string) {
  "use cache";
  cacheTag(`model-${modelSlug}`, `user-${userId}`);
  cacheLife("seconds");

  // Fetch likes count from the model
  const { data, error } = await tryCatch(
    async () =>
      await db
        .select({ likes: models.likes })
        .from(models)
        .where(eq(models.slug, modelSlug))
        .limit(1),
  );
  if (!data || error) {
    return { modelSlug, hasLiked: false, likesCount: 0 };
  }
  const likesCount = data.at(0)?.likes ?? 0;

  let hasLiked = false;

  if (userId) {
    const { data: existingLike, error: existingLikeError } = await tryCatch(
      async () =>
        await db
          .select()
          .from(likes)
          .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)))
          .limit(1),
    );

    if (!existingLike || existingLikeError) {
      return { modelSlug, hasLiked: false, likesCount: 0 };
    }
    hasLiked = existingLike.length > 0;
  }

  return { modelSlug, hasLiked, likesCount };
}
