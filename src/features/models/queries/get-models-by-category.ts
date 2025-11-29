import { count, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import type { SearchParams } from "nuqs/server";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import type { DatabaseQueryResult } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";
import { tryCatch } from "@/utils/try-catch";
import {
  type PaginationType,
  searchParamsCache,
} from "../../pagination/pagination-search-params";

export async function getModelsByCategory(
  category: string,
  pagination: PaginationType,
): Promise<DatabaseQueryResult<Model>> {
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

  return {
    items,
    totalRows,
  };
}

export async function getCategoryModels(
  category: string,
  searchParams: Promise<SearchParams>,
) {
  const search = await searchParams;
  const pagination = searchParamsCache.parse(search);

  const dbResult = await getModelsByCategory(category, pagination);

  return transformToPaginatedResult(dbResult, pagination);
}
