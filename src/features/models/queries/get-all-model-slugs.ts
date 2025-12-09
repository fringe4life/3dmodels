import { db } from "@/db";
import { type Model, models } from "@/db/schema/models";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";

export const getAllModelSlugs = async (): Promise<
  Maybe<Pick<Model, "slug">[]>
> => {
  const { data, error } = await tryCatch(() =>
    db.select({ slug: models.slug }).from(models),
  );
  if (error || !data) {
    throw new Error("Failed to fetch all model slugs from database");
  }
  return data;
};
