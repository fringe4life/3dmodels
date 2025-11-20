import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import { models } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";
export const getModelBySlug = cache(async (slug: string) => {
  "use cache";

  cacheTag("models", `model-${slug}`);
  cacheLife("hours");

  const { data, error } = await tryCatch(
    async () =>
      await db
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
        .limit(1),
  );
  if (error || !data) {
    return null;
  }
  return data[0];
});
