import type {
  PaginationType,
  RawPaginatedResult,
} from "@/lib/pagination/types";
import type { List } from "@/types";
import { tryCatch } from "@/utils/try-catch";

interface RawPaginationAccess<T> {
  fallbackPagination: PaginationType;
  getPage: () => Promise<{ items: List<T>; pagination: PaginationType }>;
}

const paginateItems = async <T>({
  fallbackPagination,
  getPage,
}: RawPaginationAccess<T>): Promise<
  RawPaginatedResult<T> & { pagination: PaginationType }
> => {
  const { data } = await tryCatch(() => getPage());
  return data ?? { items: undefined, pagination: fallbackPagination };
};

export { paginateItems };
