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
      message: "Something went wrong. Please try again later.",
      type: "error",
    } satisfies PaginatedResultError;
  }

  if (items.length === EMPTY_LIST_LENGTH) {
    return {
      message: "There are no Models",
      type: "empty",
    } satisfies PaginatedResultEmpty;
  }

  return {
    items,
    metadata: {
      count: totalCount,
      hasNextPage,
      page: pagination.page,
    },
    type: "success",
  } satisfies PaginatedResultSuccess<T>;
};
