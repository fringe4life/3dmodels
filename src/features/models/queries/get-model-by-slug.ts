import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import { models } from "@/db/schema/models";

export const getModelBySlug = cache(async (slug: string) => {
  "use cache";

  cacheTag("models", `model-${slug}`);
  cacheLife("hours");

  const foundModel = await db
    .select({
      slug: models.slug,
      name: models.name,
      description: models.description,
      image: models.image,
      categorySlug: models.categorySlug,
      dateAdded: models.dateAdded,
    })
    .from(models)
    .where(eq(models.slug, slug))
    .limit(1);

  if (foundModel.length === 0) {
    throw new Error(`Model with slug ${slug} not found`);
  }

  return foundModel[0];
});
