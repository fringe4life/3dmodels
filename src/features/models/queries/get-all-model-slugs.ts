import { db } from "@/db";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";

export const getAllModelSlugs = async (): Promise<
  Maybe<{ slug: string }[]>
> => {
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
