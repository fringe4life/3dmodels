import { updateTag } from "next/cache";

/**
 * Expire every cache entry tagged `"models"` (list pages + detail queries).
 *
 * Used on like/unlike so counts and `sort=popular` order stay consistent.
 * Broader than a single-model tag; acceptable until content and likes are split.
 *
 * @see docs/MODEL_CACHE_SPLIT.md — Longer-term cache split (stable content vs likes) and sorting impact
 */
export function invalidateAllModels(): void {
  updateTag("models");
}
