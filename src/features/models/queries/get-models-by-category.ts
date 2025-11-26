import { count, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import type { SearchParams } from "nuqs/server";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import type { PaginatedResult } from "@/types";
import { tryCatch } from "@/utils/try-catch";
import {
  type PaginationType,
  searchParamsCache,
} from "../pagination-search-params";

export async function getModelsByCategory(
  category: string,
  pagination: PaginationType,
): Promise<PaginatedResult<Model>> {
  "use cache";

  cacheTag("models", `models-category-${category}`);
  cacheLife("hours");

  const [{ data: items }, { data: totalRows }] = await Promise.all([
    tryCatch(
      async () =>
        await db
          .select()
          .from(models)
          .where(eq(models.categorySlug, category))
          .orderBy(models.name)
          .limit(pagination.limit)
          .offset(pagination.page * pagination.limit),
    ),
    tryCatch(
      async () =>
        await db
          .select({ value: count(models.slug).mapWith(Number) })
          .from(models)
          .where(eq(models.categorySlug, category)),
    ),
  ]);

  const list = items ?? null;
  const totalCount = totalRows?.[0]?.value ?? 0;
  const hasNextPage = (pagination.page + 1) * pagination.limit < totalCount;
  const nextCursor = hasNextPage ? String(pagination.page + 1) : null;

  return {
    list,
    metadata: {
      count: totalCount,
      hasNextPage,
      nextCursor,
    },
  };
}

export async function getCategoryModels(
  category: string,
  searchParams: Promise<SearchParams>,
) {
  const search = await searchParams;
  const pagination = searchParamsCache.parse(search);
  return getModelsByCategory(category, pagination);
}
