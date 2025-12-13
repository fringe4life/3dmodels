import { and, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";
import type { HasLiked } from "@/features/models/types";
import { tryCatch } from "@/utils/try-catch";

/**
 * Fetches the likes count for a model.
 * Uses "use cache: remote" to work in dynamic contexts (after connection() is awaited).
 * Shared across all users.
 * Cache is invalidated on-demand via invalidateModel() when likes change.
 */
export const getLikesCount = async (modelSlug: string) => {
  "use cache: remote";
  cacheTag(`model-${modelSlug}`);
  cacheLife("hours");

  const { data, error } = await tryCatch(() =>
    db
      .select({ likes: models.likes })
      .from(models)
      .where(eq(models.slug, modelSlug))
      .limit(1),
  );
  if (!data || error) {
    return { modelSlug, likesCount: 0 };
  }
  const likesCount = data.at(0)?.likes ?? 0;

  return { modelSlug, likesCount };
};

/**
 * Fetches whether a user has liked a model.
 * Uses "use cache: private" to cache on the user's device.
 * User-specific data.
 * Cache is invalidated on-demand via invalidateModel() when likes change.
 */
export const getHasLikedStatus = async (
  modelSlug: string,
  userId: string,
): Promise<HasLiked> => {
  "use cache: private";
  cacheTag(`model-${modelSlug}`);
  cacheLife("hours");

  const { data, error } = await tryCatch(() =>
    db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)))
      .limit(1),
  );

  if (!data || error) {
    return { modelSlug, hasLiked: false };
  }
  const hasLiked = data.length > 0;

  return { modelSlug, hasLiked };
};
