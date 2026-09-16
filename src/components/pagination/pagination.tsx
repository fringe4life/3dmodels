"use client";

import { between, hstack } from "@styled-system/patterns";
import { useQueryStates } from "nuqs";
import { addTransitionType, useTransition, ViewTransition } from "react";
import { cursorPaginationParsers } from "@/lib/pagination/search-params";
import type {
  Direction,
  Id,
  PaginationMetadataObject,
} from "@/lib/pagination/types";
import type { Prettify } from "@/types";
import { PaginationLimitControl } from "./pagination-limit-control";
import { PaginationPageControl } from "./pagination-page-control";

type PaginationProps<T extends Id> = Prettify<
  PaginationMetadataObject & {
    items: T[];
  }
>;

const pagerTransitionType = (direction: Direction) =>
  direction === "forward" ? "forwards" : "backwards";

const Pagination = <T extends Id>({
  items,
  metadata: { hasNextPage, hasPreviousPage },
}: PaginationProps<T>) => {
  const [isPending, startTransition] = useTransition();
  const [{ cursor }, setCursorState] = useQueryStates(cursorPaginationParsers);

  const handlePageChange = (direction: Direction) => {
    if (isPending) {
      return;
    }
    const cursorItem = direction === "forward" ? items.at(-1) : items.at(0);
    const nextCursor = cursorItem?.id ?? cursor;
    if (!nextCursor) {
      return;
    }

    startTransition(async () => {
      addTransitionType(pagerTransitionType(direction));
      await setCursorState({
        cursor: nextCursor,
        direction,
      });
    });
  };

  const handleNextPage = () => {
    handlePageChange("forward");
  };

  const handlePreviousPage = () => {
    handlePageChange("backward");
  };

  return (
    <ViewTransition name="pagination">
      <div className={between()}>
        <PaginationLimitControl />
        <div className={hstack({ columnGap: 2 })}>
          <PaginationPageControl
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            isPending={isPending}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </div>
      </div>
    </ViewTransition>
  );
};

export { Pagination };
