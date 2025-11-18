import { cache } from "react";
import { db } from "@/db";
import { models } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";

export const getAllModelSlugs = cache(async (): Promise<{ slug: string }[]> => {
  const { data, error } = await tryCatch(
    async () => await db.select({ slug: models.slug }).from(models),
  );
  if (error || !data) {
    return [];
  }
  return data;
});
