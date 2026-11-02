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
 * Every category with how many models it holds, for the home page band.
 *
 * `"use cache: remote"` + `cacheLife("max")` keeps the payload in the shared cache.
 * Tagged `categories` and `models`: a like's `updateTag("models")` (and any future
 * category mutation on `categories`) expires the entry, so counts stay honest when
 * the catalogue moves. A reseed plus deploy also refreshes remote entries because
 * they are keyed by build id.
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
