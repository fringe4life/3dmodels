import { and, eq, gt, lt, or, type SQL, type SQLWrapper } from "drizzle-orm";
import type { SortDirection } from "@/lib/pagination/types";

interface CreateKeysetCursorPredicateParams {
  cursorId: string;
  idColumn: SQLWrapper;
  idDirection: SortDirection;
  sortColumn: SQLWrapper;
  sortDirection: SortDirection;
  sortValue: unknown;
}

const createKeysetCursorPredicate = ({
  cursorId,
  idColumn,
  idDirection,
  sortColumn,
  sortDirection,
  sortValue,
}: CreateKeysetCursorPredicateParams): SQL => {
  const pastSortValue =
    sortDirection === "desc"
      ? lt(sortColumn, sortValue)
      : gt(sortColumn, sortValue);
  const pastId =
    idDirection === "desc" ? lt(idColumn, cursorId) : gt(idColumn, cursorId);

  const predicate = or(pastSortValue, and(eq(sortColumn, sortValue), pastId));

  if (!predicate) {
    throw new Error("Failed to build keyset cursor predicate");
  }

  return predicate;
};

export { createKeysetCursorPredicate };
