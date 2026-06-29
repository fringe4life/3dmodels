import { and, eq, ilike, or, type SQL } from "drizzle-orm";
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
        ilike(models.name, searchPattern),
        ilike(models.description, searchPattern),
      ) as SQL,
    );
  }

  if (category) {
    conditions.push(eq(models.categorySlug, category));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
};

export { buildModelsWhere };
