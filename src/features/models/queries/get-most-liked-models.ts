import { desc, eq, getTableColumns } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, models } from "@/db/schema/models";
import type { ModelWithCategory } from "@/features/models/types";

/** Cards in the home page ranked row: two files of two at tablet and desktop. */
export const MOST_LIKED_LIMIT = 4;

/**
 * Invalidation handle for the row. `revalidateTag("models-popular")` refreshes
 * the ordering without waiting out the week-long profile. Kept file-local until
 * a like/toggle caller wires it (see #208 follow-ups).
 */
const MOST_LIKED_CACHE_TAG = "models-popular";

/**
 * Ranked models for the home page row.
 *
 * `use cache: remote` + `cacheLife("weeks")`: the ordering moves slowly and the
 * payload is identical for every visitor, so it belongs in the shared cache
 * rather than in per-request work. `models_likes_id_idx` serves the ordering, so
 * the entry is a single index scan with no counting.
 *
 * The category display name comes from the `categories` row itself (the same
 * source the nav and category pages read), not from a slug→label map, so editing
 * a name in the database lands here and nowhere else has to change.
 *
 * Like counts travel inside this entry. A press updates the model's counter and
 * the client's optimistic state; the row itself only moves when the tag is
 * revalidated, which is the trade the week-long profile buys.
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
