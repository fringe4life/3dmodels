import type { RawPaginatedResult } from "@/features/pagination/types";
import type { List, Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";

interface RawPaginationAccess<T> {
  getItems: () => Promise<List<T>>;
  getItemsCount: () => Promise<Maybe<number>>;
}

const paginateItems = async <T>({
  getItems,
  getItemsCount,
}: RawPaginationAccess<T>): Promise<RawPaginatedResult<T>> => {
  const [{ data: items }, { data: itemsCount }] = await Promise.all([
    tryCatch(() => getItems()),
    tryCatch(() => getItemsCount()),
  ]);
  return { items, itemsCount };
};

export { paginateItems };
