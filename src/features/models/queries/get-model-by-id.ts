import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import { models } from "@/db/schema/models";

export const getModelById = cache(async (id: string | number) => {
  "use cache";

  const modelId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  cacheTag("models", `model-${modelId}`);
  cacheLife("hours");

  if (Number.isNaN(modelId)) {
    throw new Error(`Invalid model id: ${id}`);
  }

  const foundModel = await db
    .select({
      id: models.id,
      name: models.name,
      description: models.description,
      image: models.image,
      categorySlug: models.categorySlug,
      dateAdded: models.dateAdded,
    })
    .from(models)
    .where(eq(models.id, modelId))
    .limit(1);

  if (foundModel.length === 0) {
    throw new Error(`Model with id ${id} not found`);
  }

  return foundModel[0];
});
