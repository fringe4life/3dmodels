import { and, eq, ilike, or } from "drizzle-orm";
import { db } from "@/db";
import { models } from "@/db/schema/models";
import type { Maybe } from "@/types";

const getModelsCount = ({
  searchPattern,
  category,
}: {
  searchPattern: string;
  category: Exclude<Maybe<string>, null>;
}) => {
  const searchWhereCondition = or(
    ilike(models.name, searchPattern),
    ilike(models.description, searchPattern),
  );
  const countWhereCondition = category
    ? and(eq(models.categorySlug, category), searchWhereCondition)
    : searchWhereCondition;

  return db.$count(models, countWhereCondition);
};

export { getModelsCount };
