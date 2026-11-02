import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import { categories, type Model, models } from "@/db/schema/models";
import type { Prettify } from "@/types";
import { tryCatch } from "@/utils/try-catch";

/**
 * Detail row for one model. The category label comes from the joined
 * `categories.display_name`, so the page never renders a slug.
 */
type ModelDetail = Prettify<
  Omit<Model, "categorySlug" | "id" | "userId"> & {
    categoryDisplayName: string;
  }
>;

export const getModelBySlug = cache(
  async (slug: string): Promise<ModelDetail> => {
    "use cache";

    cacheTag("models", `model-${slug}`);
    cacheLife("max");

    const { data, error } = await tryCatch(() =>
      db
        .select({
          categoryDisplayName: categories.displayName,
          dateAdded: models.dateAdded,
          description: models.description,
          image: models.image,
          likes: models.likes,
          name: models.name,
          slug: models.slug,
        })
        .from(models)
        .innerJoin(categories, eq(models.categorySlug, categories.slug))
        .where(eq(models.slug, slug))
        .limit(1),
    );
    const [model] = data ?? [];
    if (error || !model) {
      throw new Error("Model not found");
    }

    return model;
  },
);
