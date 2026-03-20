import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import type { PaginationType } from "@/features/pagination/types";
import type { List, Maybe } from "@/types";

/** `where` for `db.query.models.findMany` (Drizzle RQB / relational filter shape). */
type ModelsFindManyWhere = NonNullable<
  NonNullable<Parameters<typeof db.query.models.findMany>[0]>["where"]
>;

const getModelsList = ({
  searchPattern,
  category,
  pagination: { limit, page },
}: {
  searchPattern: Exclude<Maybe<string>, null>;
  category: Exclude<Maybe<string>, null>;
  pagination: PaginationType;
}): Promise<List<Model>> => {
  // Build where clause conditionally based on what's present
  let where: ModelsFindManyWhere | undefined;
  if (searchPattern && category) {
    // Both searchPattern and category exist: combine with AND
    where = {
      AND: [
        {
          OR: [
            { name: { ilike: searchPattern } },
            { description: { ilike: searchPattern } },
          ],
        },
        { categorySlug: { eq: category } },
      ],
    };
  } else if (searchPattern) {
    // Only searchPattern exists: use OR for search
    where = {
      OR: [
        { name: { ilike: searchPattern } },
        { description: { ilike: searchPattern } },
      ],
    };
  } else if (category) {
    // Only category exists: filter by category
    where = {
      categorySlug: { eq: category },
    };
  }
  // If neither exists, where is undefined (no filtering, return all models)

  return db.query.models.findMany({
    where,
    orderBy: (models, { asc }) => [asc(models.name)],
    limit,
    offset: page * limit,
  });
};

export { getModelsList };
