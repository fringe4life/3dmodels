import { updateTag } from "next/cache";

/**
 * Cache invalidation utilities for models
 *
 * Uses updateTag for immediate cache expiration (read-your-own-writes)
 * This demonstrates how to use the granular cache tags we've set up:
 * - "models" - invalidates all model-related caches
 * - "model-{id}" - invalidates only a specific model's cache
 */

/**
 * Invalidate all model caches
 * Use this when you want to refresh all model data across the app
 */
export function invalidateAllModels() {
  updateTag("models");
}

/**
 * Invalidate cache for a specific model
 * Use this when updating a single model to avoid unnecessary cache invalidation
 */
export function invalidateModel(modelId: string | number) {
  updateTag(`model-${modelId}`);
}

/**
 * Invalidate multiple specific models
 * Use this when updating multiple models but not all
 */
export function invalidateModels(modelIds: (string | number)[]) {
  for (const id of modelIds) {
    updateTag(`model-${id}`);
  }
}

/**
 * Invalidate cache for a specific category
 * Use this when you know only models in a specific category were affected
 */
export function invalidateCategory(categorySlug: string) {
  updateTag(`models-category-${categorySlug}`);
}

/**
 * Invalidate multiple categories
 * Use this when updating models across multiple categories
 */
export function invalidateCategories(categorySlugs: string[]) {
  for (const slug of categorySlugs) {
    updateTag(`models-category-${slug}`);
  }
}

/**
 * Example usage in a future model update action:
 *
 * export async function updateModel(modelId: string, data: UpdateModelData) {
 *   // Get the current model to check for category changes
 *   const currentModel = await getModelById(modelId);
 *
 *   // Update the model in the database
 *   await db.update(models)
 *     .set(data)
 *     .where(eq(models.id, modelId));
 *
 *   // Always invalidate the specific model's cache
 *   invalidateModel(modelId);
 *
 *   // If category changed, invalidate both old and new category caches
 *   if (data.categorySlug && data.categorySlug !== currentModel.categorySlug) {
 *     invalidateCategory(currentModel.categorySlug);
 *     invalidateCategory(data.categorySlug);
 *   }
 *
 *   // Only invalidate all models if it's a significant change
 *   // (e.g., name, description, or other list-affecting properties)
 *   if (data.name || data.description) {
 *     invalidateAllModels();
 *   }
 * }
 *
 * export async function deleteModel(modelId: string) {
 *   // Get the model to know which category to invalidate
 *   const model = await getModelById(modelId);
 *
 *   // Delete from database
 *   await db.delete(models).where(eq(models.id, modelId));
 *
 *   // Invalidate the specific model, its category, and all models
 *   invalidateModel(modelId);
 *   invalidateCategory(model.categorySlug);
 *   invalidateAllModels();
 * }
 *
 * export async function createModel(data: CreateModelData) {
 *   // Create the model in the database
 *   const newModel = await db.insert(models).values(data).returning();
 *
 *   // Invalidate the category cache and all models cache
 *   invalidateCategory(data.categorySlug);
 *   invalidateAllModels();
 * }
 */
