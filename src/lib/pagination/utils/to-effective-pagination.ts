import { DEFAULT_CURSOR, DEFAULT_DIRECTION } from "@/lib/pagination/constants";
import type { PaginationType } from "@/lib/pagination/types";

type ToEffectivePaginationParams = PaginationType & {
  cursorRowExists: boolean;
};

const toEffectivePagination = ({
  cursor,
  cursorRowExists,
  direction,
  limit,
}: ToEffectivePaginationParams): PaginationType => {
  if (!(cursor && cursorRowExists)) {
    return {
      cursor: DEFAULT_CURSOR,
      direction: DEFAULT_DIRECTION,
      limit,
    };
  }

  return { cursor, direction, limit };
};

export { toEffectivePagination };
