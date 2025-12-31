import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import type { PaginationType } from "@/features/pagination/types";
import type { List, Maybe } from "@/types";

const getModelsList = ({
  searchPattern,
  category,
  pagination,
}: {
  searchPattern: Exclude<Maybe<string>, null>;
  category: Exclude<Maybe<string>, null>;
  pagination: PaginationType;
}): Promise<List<Model>> => {
  // Build where clause conditionally based on what's present
  // biome-ignore lint/suspicious/noEvolvingTypes: not sure yet how to type this
  // biome-ignore lint/suspicious/noImplicitAnyLet: will type it later
  let where;
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
    limit: pagination.limit,
    offset: pagination.page * pagination.limit,
  });
};

export { getModelsList };
