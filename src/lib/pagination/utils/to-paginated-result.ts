import type {
  PaginatedResult,
  PaginatedResultEmpty,
  PaginatedResultError,
  PaginatedResultSuccess,
  PaginationType,
  RawPaginatedResult,
} from "@/lib/pagination/types";
import {
  isEmptyCatalog,
  toPagination,
} from "@/lib/pagination/utils/to-pagination";

export const transformToPaginatedResult = <T>(
  { items }: RawPaginatedResult<T>,
  pagination: PaginationType,
): PaginatedResult<T> => {
  const paged = toPagination({ ...pagination, items });

  if (!paged) {
    return {
      message: "Something went wrong. Please try again later.",
      type: "error",
    } satisfies PaginatedResultError;
  }

  if (isEmptyCatalog(paged, pagination.cursor)) {
    return {
      message: "There are no Models",
      type: "empty",
    } satisfies PaginatedResultEmpty;
  }

  return {
    items: paged.items,
    metadata: paged.metadata,
    type: "success",
  } satisfies PaginatedResultSuccess<T>;
};
