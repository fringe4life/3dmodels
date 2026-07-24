import { and, eq, like, or, type SQL, sql } from "drizzle-orm";
import type { CategorySlug } from "@/db/brands";
import { models } from "@/db/schema/models";
import type { Maybe } from "@/types";

const buildModelsWhere = (
  searchPattern: Exclude<Maybe<string>, null>,
  category: Exclude<Maybe<CategorySlug>, null>,
): SQL | undefined => {
  const conditions: SQL[] = [];

  if (searchPattern) {
    conditions.push(
      or(
        like(sql`${models.name} COLLATE NOCASE`, searchPattern),
        like(sql`${models.description} COLLATE NOCASE`, searchPattern),
      ) as SQL,
    );
  }

  if (category) {
    conditions.push(eq(models.categorySlug, category));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
};

export { buildModelsWhere };
