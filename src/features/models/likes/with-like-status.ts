import type { Model } from "@/db/schema/models";
import type { ModelWithLikeStatus } from "@/features/models/types";
import { DEFAULT_HAS_LIKED } from "./constants";

export const withLikeStatuses = (
  items: readonly Model[],
  likedSlugs: Set<string> | null,
): ModelWithLikeStatus[] =>
  items.map((model) => ({
    ...model,
    hasLiked: likedSlugs?.has(model.slug) ?? DEFAULT_HAS_LIKED.hasLiked,
  }));
