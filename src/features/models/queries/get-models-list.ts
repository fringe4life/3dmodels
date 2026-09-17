/** biome-ignore-all lint/suspicious/noUnnecessaryConditions: false positive — biome cannot resolve Valibot branded Sort through switch cases (tsc validates) */
import { and, eq, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { type Model, models } from "@/db/schema/models";
import type { Sort } from "@/features/models/sort/brands";
import type { PaginationType } from "@/lib/pagination/types";
import { createKeysetCursorPredicate } from "@/lib/pagination/utils/create-keyset-cursor";
import { toEffectivePagination } from "@/lib/pagination/utils/to-effective-pagination";
import type { List, Prettify } from "@/types";
import {
  orderByForSort,
  sortColumnForSort,
  sortDirectionForSort,
} from "../sort/order-for-sort";
import type { CategoryFilter, QueryPagination, SearchPattern } from "../types";
import { buildModelsWhere } from "./build-models-where";

type GetModelsListParams = Prettify<
  SearchPattern &
    CategoryFilter & {
      pagination: QueryPagination;
      sort: Sort;
    }
>;

interface ModelsListPage {
  items: List<Model>;
  pagination: PaginationType;
}

type CursorRow = Pick<Model, "dateAdded" | "likes" | "name">;

const sortValueFromRow = (sort: Sort, row: CursorRow) => {
  switch (sort) {
    case "popular":
      return row.likes;
    case "recent":
      return row.dateAdded;
    default:
      return row.name;
  }
};

const getCursorRow = async (
  cursorId: NonNullable<QueryPagination["cursor"]>,
): Promise<CursorRow | undefined> => {
  const [row] = await db
    .select({
      dateAdded: models.dateAdded,
      likes: models.likes,
      name: models.name,
    })
    .from(models)
    .where(eq(models.id, cursorId))
    .limit(1);

  return row;
};

const getModelsList = async ({
  searchPattern,
  category,
  pagination: { limit, cursor, direction },
  sort,
}: GetModelsListParams): Promise<ModelsListPage> => {
  const take = limit + 1;
  const filter = buildModelsWhere(searchPattern, category);
  const cursorRow = cursor ? await getCursorRow(cursor) : undefined;
  const pagination = toEffectivePagination({
    cursor: cursor ?? "",
    cursorRowExists: cursorRow !== undefined,
    direction,
    limit,
  });
  const sortDirection = sortDirectionForSort(sort, pagination.direction);
  let keyset: SQL | undefined;

  if (cursor && cursorRow) {
    keyset = createKeysetCursorPredicate({
      cursorId: cursor,
      idColumn: models.id,
      idDirection: sortDirection,
      sortColumn: sortColumnForSort(sort),
      sortDirection,
      sortValue: sortValueFromRow(sort, cursorRow),
    });
  }

  const whereClause = keyset ? and(filter, keyset) : filter;

  const items = await db
    .select()
    .from(models)
    .where(whereClause)
    .orderBy(...orderByForSort(sort, pagination.direction))
    .limit(take);

  return { items, pagination };
};

export { getModelsList };
