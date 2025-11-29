import type { PaginationType } from "../pagination-search-params";
import type { DatabaseQueryResult, PaginatedResult } from "../types";

export function transformToPaginatedResult<T>(
  { items, totalRows }: DatabaseQueryResult<T>,
  pagination: PaginationType,
): PaginatedResult<T> {
  const list = items;
  const totalCount = totalRows?.at(0)?.value ?? 0;
  const hasNextPage = (pagination.page + 1) * pagination.limit < totalCount;
  const nextCursor = hasNextPage ? String(pagination.page + 1) : null;

  return {
    list,
    metadata: {
      count: totalCount,
      hasNextPage,
      nextCursor,
    },
  };
}
