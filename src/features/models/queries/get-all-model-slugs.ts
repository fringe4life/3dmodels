import { db } from "@/db";
import { tryCatch } from "@/utils/try-catch";
import type { ModelSlugs } from "../types";

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
