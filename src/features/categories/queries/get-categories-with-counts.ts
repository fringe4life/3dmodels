import { count, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import type { CategorySlug } from "@/db/brands";
import { toCategorySlug } from "@/db/brands";
import { categories, models } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";

interface CategoryWithCount {
  modelCount: number;
  name: string;
  slug: CategorySlug;
}

/**
 * Every category with how many models it holds, for the home page band and the
 * catalogue nav.
 *
 * Cached for good: this is a demo catalogue whose category list and model set
 * are fixed at seed time, so the counts cannot drift between deploys.
 * `"use cache: remote"` keeps it in the shared cache; remote entries are keyed by
 * build id, so a reseed plus a deploy is what refreshes them — no
 * `revalidateTag` call is needed for that. Both tags are attached so a future
 * mutation path can invalidate labels and counts together.
 */
export const getCategoriesWithCounts = async (): Promise<
  CategoryWithCount[]
> => {
  "use cache: remote";

  cacheTag("categories", "models");
  cacheLife("max");

  const { data, error } = await tryCatch(() =>
    db
      .select({
        modelCount: count(models.slug),
        name: categories.displayName,
        slug: categories.slug,
      })
      .from(categories)
      .leftJoin(models, eq(models.categorySlug, categories.slug))
      .groupBy(categories.slug, categories.displayName)
      .orderBy(categories.id),
  );

  if (error || !data) {
    throw new Error("Failed to load categories with counts");
  }

  return data.map(({ modelCount, name, slug }) => ({
    modelCount,
    name,
    slug: toCategorySlug(slug),
  }));
};
