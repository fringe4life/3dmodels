import { getLikedSlugsForUser } from "@/features/models/likes/queries/like-status";
import { withLikeStatuses } from "@/features/models/likes/with-like-status";
import { getMostLikedModels } from "@/features/models/queries/get-most-liked-models";
import type { ModelWithLikeStatus } from "@/features/models/types";
import { getUser } from "@/lib/auth/get-user";
import type { IsAuthenticated } from "@/lib/auth/types";
import type { Prettify } from "@/types";

type MostLikedReturn = Prettify<
  IsAuthenticated & {
    models: ModelWithLikeStatus[];
  }
>;

/**
 * Cached ranking + per-user like state.
 *
 * Only the ranking is cached; the liked set is read per request so a signed-in
 * visitor never sees someone else's heart state from a shared cache entry.
 */
export const getMostLiked = async (): Promise<MostLikedReturn> => {
  const [ranked, auth] = await Promise.all([getMostLikedModels(), getUser()]);

  const likedSlugs = auth.isAuthenticated
    ? await getLikedSlugsForUser(
        auth.user.id,
        ranked.map((model) => model.slug),
      )
    : null;

  return {
    isAuthenticated: auth.isAuthenticated,
    models: withLikeStatuses(ranked, likedSlugs),
  };
};
