import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import { tryCatch } from "@/utils/try-catch";
import type { CategoryDetail } from "../types";

export const getCategoryBySlug = cache(
  async (slug: string): Promise<CategoryDetail> => {
    "use cache";
    cacheTag("categories", `category-${slug}`);
    cacheLife("max");

    const { data, error } = await tryCatch(() =>
      db.query.categories.findFirst({
        where: { slug },
        columns: {
          displayName: true,
        },
      }),
    );

    if (error) {
      throw new Error("Failed to load category");
    }

    if (!data) {
      return null;
    }

    return data;
  },
);
