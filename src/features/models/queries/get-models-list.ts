import { asc, sql } from "drizzle-orm";
import { db } from "@/db";
import { type Model, models } from "@/db/schema/models";
import type { PaginationType } from "@/features/pagination/types";
import type { List, Maybe } from "@/types";

const modelsListPrepared = db
  .select()
  .from(models)
  .where(sql`
    (
      ${sql.placeholder("hasSearch")} = false
      or ${models.name} ilike ${sql.placeholder("searchPattern")}
      or ${models.description} ilike ${sql.placeholder("searchPattern")}
    )
    and (
      ${sql.placeholder("hasCategory")} = false
      or ${models.categorySlug} = ${sql.placeholder("category")}
    )
  `)
  .orderBy(asc(models.name))
  .limit(sql.placeholder("limit"))
  .offset(sql.placeholder("offset"))
  .prepare("get_models_list");

const getModelsList = ({
  searchPattern,
  category,
  pagination: { limit, page },
}: {
  searchPattern: Exclude<Maybe<string>, null>;
  category: Exclude<Maybe<string>, null>;
  pagination: PaginationType;
}): Promise<List<Model>> => {
  const hasSearch = Boolean(searchPattern);
  const hasCategory = Boolean(category);
  return modelsListPrepared.execute({
    hasSearch,
    searchPattern: searchPattern ?? "%%",
    hasCategory,
    category: category ?? "",
    limit,
    offset: page * limit,
  });
};

export { getModelsList };
