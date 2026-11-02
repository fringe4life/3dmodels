import type { Model } from "@/db/schema/models";
import { DEFAULT_HAS_LIKED } from "./constants";
import type { HasLiked } from "./types";

/**
 * Generic over the row type so joined payloads (e.g. the ranked row carrying
 * `categoryDisplayName`) keep their extra columns instead of collapsing to
 * `Model`.
 */
export const withLikeStatuses = <TRow extends Model>(
  items: readonly TRow[],
  likedSlugs: Set<string> | null,
): (TRow & HasLiked)[] =>
  items.map((model) => ({
    ...model,
    hasLiked: likedSlugs?.has(model.slug) ?? DEFAULT_HAS_LIKED.hasLiked,
  }));
