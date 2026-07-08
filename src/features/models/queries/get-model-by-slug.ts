import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import type { Prettify } from "@/types";
import { tryCatch } from "@/utils/try-catch";

type ModelDetail = Prettify<Omit<Model, "hasLiked" | "userId">>;

export const getModelBySlug = cache(
  async (slug: string): Promise<ModelDetail> => {
    "use cache";

    cacheTag("models", `model-${slug}`);
    cacheLife("max");

    const { data, error } = await tryCatch(() =>
      db.query.models.findFirst({
        columns: {
          categorySlug: true,
          dateAdded: true,
          description: true,
          image: true,
          likes: true,
          name: true,
          slug: true,
        },
        where: { slug },
      }),
    );
    if (error || !data) {
      throw new Error("Model not found");
    }

    return data;
  },
);
