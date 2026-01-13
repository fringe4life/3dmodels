import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import { tryCatch } from "@/utils/try-catch";
import type { ModelDetail } from "../types";

export const getModelBySlug = cache(
  async (slug: string): Promise<ModelDetail> => {
    "use cache";

    cacheTag("models", `model-${slug}`);
    cacheLife("hours");

    const { data, error } = await tryCatch(() =>
      db.query.models.findFirst({
        where: { slug },
        columns: {
          slug: true,
          name: true,
          description: true,
          image: true,
          categorySlug: true,
          dateAdded: true,
          likes: true,
        },
      }),
    );
    if (error || !data) {
      throw new Error("Model not found");
    }

    return data;
  },
);
