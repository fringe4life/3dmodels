import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import type { Prettify } from "@/types";
import { tryCatch } from "@/utils/try-catch";

type ModelSlugs = Prettify<Pick<Model, "slug">>[];

export const getAllModelSlugs = async (): Promise<ModelSlugs> => {
  const { data, error } = await tryCatch(() =>
    db.query.models.findMany({
      columns: {
        slug: true,
      },
    }),
  );
  if (error || !data) {
    throw new Error("Failed to fetch all model slugs from database");
  }
  return data;
};
