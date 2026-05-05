import { count, sql } from "drizzle-orm";
import { db } from "@/db";
import { models } from "@/db/schema/models";
import type { Maybe } from "@/types";

const modelsCountPrepared = db
  .select({ count: count() })
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
  .prepare("get_models_count");

const getModelsCount = async ({
  searchPattern,
  category,
}: {
  searchPattern: Exclude<Maybe<string>, null>;
  category: Exclude<Maybe<string>, null>;
}) => {
  const hasSearch = Boolean(searchPattern);
  const hasCategory = Boolean(category);
  const [result] = await modelsCountPrepared.execute({
    hasSearch,
    searchPattern: searchPattern ?? "%%",
    hasCategory,
    category: category ?? "",
  });
  return Number(result?.count ?? 0);
};

export { getModelsCount };
