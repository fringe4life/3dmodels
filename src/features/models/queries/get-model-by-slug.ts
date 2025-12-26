import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";
export const getModelBySlug = cache(
  async (
    slug: string,
  ): Promise<Maybe<Omit<Model, "hasLiked" | "likes" | "userId">>> => {
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
        },
      }),
    );
    if (error || !data) {
      throw new Error("Model not found");
    }
    return data;
  },
);
