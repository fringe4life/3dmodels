import { db } from "@/db";
import type { PaginationType } from "@/features/pagination/types";
import type { Maybe } from "@/types";

const getModelsList = ({
  searchPattern,
  category,
  pagination,
}: {
  searchPattern: string;
  category: Exclude<Maybe<string>, null>;
  pagination: PaginationType;
}) =>
  db.query.models.findMany({
    where: {
      OR: [
        { name: { ilike: searchPattern } },
        { description: { ilike: searchPattern } },
      ],
      categorySlug: { eq: category },
    },
    orderBy: (models, { asc }) => [asc(models.name)],
    limit: pagination.limit,
    offset: pagination.page * pagination.limit,
  });

export { getModelsList };
