import type {
  PaginatedResult,
  PaginationType,
  RawPaginationResult,
} from "@/features/pagination/types";

export const transformToPaginatedResult = <T>(
  { items, itemsCount }: RawPaginationResult<T>,
  pagination: PaginationType,
): PaginatedResult<T> => {
  const totalCount = itemsCount ?? 0;
  const hasNextPage = (pagination.page + 1) * pagination.limit < totalCount;
  const nextCursor = hasNextPage ? String(pagination.page + 1) : null;

  return {
    items,
    metadata: {
      count: totalCount,
      hasNextPage,
      nextCursor,
    },
  };
};
