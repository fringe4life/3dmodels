import { cache } from "react";
import { db } from "@/db";
import { models } from "@/db/schema/models";

export const getAllModelSlugs = cache(async (): Promise<{ slug: string }[]> => {
  try {
    const result = await db.select({ slug: models.slug }).from(models);
    return result;
  } catch {
    throw new Error("Failed to fetch model slugs");
  }
});
