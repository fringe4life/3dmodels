import { db } from "@/db";
import type { HasLiked } from "@/features/models/types";
import { tryCatch } from "@/utils/try-catch";

/**
 * Fetches the likes count for a model.
 * Uses "use cache: remote" to work in dynamic contexts (after connection() is awaited).
 * Shared across all users.
 * Cache is invalidated on-demand via invalidateModel() when likes change.
 */
// export const getLikesCount = async (slug: string) => {
//   const { data, error } = await tryCatch(() =>
//     db.query.models.findFirst({
//       where: { slug },
//       columns: {
//         likes: true,
//       },
//     }),
//   );
//   if (!data || error) {
//     return { slug, likesCount: 0 };
//   }
//   const likesCount = data.likes ?? 0;

//   return { slug, likesCount };
// };

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
    return { hasLiked: false };
  }
  const hasLiked = data !== null;

  return { hasLiked };
};
