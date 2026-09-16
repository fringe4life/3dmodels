import { EMPTY_LIST_LENGTH } from "@/constants";
import type {
  PaginationMetadata,
  ToPaginationParams,
} from "@/lib/pagination/types";
import type { Prettify } from "@/types";

type ToPaginationResult<T> = Prettify<{
  items: T[];
  metadata: PaginationMetadata;
}>;

const toPagination = <T>({
  items,
  limit,
  cursor,
  direction = "forward",
}: ToPaginationParams<T>): ToPaginationResult<T> | null => {
  if (!items) {
    return null;
  }

  const hasMoreResults = items.length > limit;
  let actualItems = hasMoreResults ? items.slice(0, limit) : items;
  const hasCursor = Boolean(cursor);
  const hasNextPage = direction === "forward" ? hasMoreResults : hasCursor;
  const hasPreviousPage = direction === "forward" ? hasCursor : hasMoreResults;

  if (direction === "backward") {
    actualItems = actualItems.toReversed();
  }

  return {
    items: actualItems,
    metadata: {
      hasNextPage,
      hasPreviousPage,
    },
  };
};

const isEmptyCatalog = <T>(
  result: ToPaginationResult<T>,
  cursor: string,
): boolean => result.items.length === EMPTY_LIST_LENGTH && !cursor;

export { isEmptyCatalog, toPagination };
