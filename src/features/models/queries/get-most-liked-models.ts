import { desc, eq, getTableColumns } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, models } from "@/db/schema/models";
import type { ModelWithCategory } from "@/features/models/types";

/** Cards in the home page ranked row: two files of two at tablet and desktop. */
export const MOST_LIKED_LIMIT = 4;

/**
 * Narrow invalidation handle for this row. Today every like also expires it via
 * the shared `models` tag (`invalidateAllModels` → `updateTag("models")`), so the
 * weeks profile is an upper bound rather than the usual lifetime. Prefer
 * `revalidateTag("models-popular")` if a future path should refresh only ranking.
 */
const MOST_LIKED_CACHE_TAG = "models-popular";

/**
 * Ranked models for the home page row.
 *
 * `use cache: remote` + `cacheLife("weeks")`: the ordering is identical for every
 * visitor, so it belongs in the shared cache rather than in per-request work.
 * `models_likes_id_idx` serves the ordering, so the entry is a single index scan
 * with no counting.
 *
 * The category display name comes from the `categories` row itself (the same
 * source the nav and category pages read), not from a slug→label map, so editing
 * a name in the database lands here and nowhere else has to change.
 *
 * Like counts travel inside this entry. A press updates the model's counter and
 * the client's optimistic state, and `updateTag("models")` expires this entry so
 * the ranked order can move on the next home render. The `models-popular` tag is
 * an additional narrow handle if ranking should ever invalidate alone.
 */
export const getMostLikedModels = async (
  limit: number = MOST_LIKED_LIMIT,
): Promise<ModelWithCategory[]> => {
  "use cache: remote";

  cacheTag("models", MOST_LIKED_CACHE_TAG);
  cacheLife("weeks");

  return await db
    .select({
      ...getTableColumns(models),
      categoryDisplayName: categories.displayName,
    })
    .from(models)
    .innerJoin(categories, eq(models.categorySlug, categories.slug))
    .orderBy(desc(models.likes), desc(models.id))
    .limit(limit);
};
