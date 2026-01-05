import { EMPTY_LIST_LENGTH } from "@/constants";
import type {
  PaginatedResult,
  PaginatedResultEmpty,
  PaginatedResultError,
  PaginatedResultSuccess,
  PaginationType,
  RawPaginatedResult,
} from "@/features/pagination/types";

export const transformToPaginatedResult = <T>(
  { items, itemsCount }: RawPaginatedResult<T>,
  pagination: PaginationType,
): PaginatedResult<T> => {
  const totalCount = itemsCount ?? 0;
  const hasNextPage = (pagination.page + 1) * pagination.limit < totalCount;

  if (!items) {
    return {
      type: "error",
      message: "Something went wrong. Please try again later.",
    } satisfies PaginatedResultError;
  }

  if (items.length === EMPTY_LIST_LENGTH) {
    return {
      type: "empty",
      message: "There are no Models",
    } satisfies PaginatedResultEmpty;
  }

  return {
    items,
    metadata: {
      count: totalCount,
      hasNextPage,
    },
    type: "success",
  } satisfies PaginatedResultSuccess<T>;
};
