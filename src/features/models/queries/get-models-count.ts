import { and, eq, ilike, or, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { models } from "@/db/schema/models";
import type { Maybe } from "@/types";

const getModelsCount = ({
  searchPattern,
  category,
}: {
  searchPattern: Exclude<Maybe<string>, null>;
  category: Exclude<Maybe<string>, null>;
}) => {
  // Build where condition based on what's present
  let countWhereCondition: Exclude<Maybe<SQL>, null>;
  if (searchPattern && category) {
    // Both exist: combine with AND
    const searchWhereCondition = or(
      ilike(models.name, searchPattern),
      ilike(models.description, searchPattern),
    );
    countWhereCondition = and(
      eq(models.categorySlug, category),
      searchWhereCondition,
    );
  } else if (searchPattern) {
    // Only searchPattern exists: use OR for search
    countWhereCondition = or(
      ilike(models.name, searchPattern),
      ilike(models.description, searchPattern),
    );
  } else if (category) {
    // Only category exists: filter by category
    countWhereCondition = eq(models.categorySlug, category);
  }
  // If neither exists, countWhereCondition is undefined (no filtering, count all models)

  return db.$count(models, countWhereCondition);
};

export { getModelsCount };
