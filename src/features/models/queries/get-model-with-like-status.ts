import { db } from "@/db";
import type { HasLiked } from "@/features/models/types";
import { tryCatch } from "@/utils/try-catch";
import { DEFAULT_HAS_LIKED } from "../constants";

/**
 * Fetches whether a user has liked a model.
 * Uses "use cache: private" to cache on the user's device.
 * User-specific data.
 * Cache is invalidated on-demand via invalidateModel() when likes change.
 */
export const getHasLikedStatus = async (
  slug: string,
  userId: string,
): Promise<HasLiked> => {
  const { data, error } = await tryCatch(() =>
    db.query.likes.findFirst({
      where: {
        userId,
        modelSlug: slug,
      },
    }),
  );

  if (!data || error) {
    return DEFAULT_HAS_LIKED;
  }
  const hasLiked = data !== null;

  return { hasLiked };
};
