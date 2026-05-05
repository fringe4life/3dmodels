import { updateTag } from "next/cache";

/**
 * Invalidate cache for a specific model
 * Use this when updating a single model to avoid unnecessary cache invalidation
 */
export function invalidateModel(modelId: string | number) {
  updateTag(`model-${modelId}`);
}
