"use client";

import { useQueryStates } from "nuqs";
import {
  addTransitionType,
  type MouseEventHandler,
  startTransition,
  useId,
  ViewTransition,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LIMITS } from "@/features/pagination/constants";
import {
  options as PaginationOptions,
  paginationParser,
} from "@/features/pagination/pagination-search-params";
import type { LimitItem } from "@/features/pagination/types";
import { css } from "../../../../styled-system/css";
import { flex, square } from "../../../../styled-system/patterns";
import type { PaginationProps } from "../types";
import { PaginationButton } from "./pagination-button";

const Pagination = ({ metadata }: PaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    PaginationOptions,
  );

  const { page, limit } = pagination;
  const startOffset = page * limit + 1;
  const endOffset = startOffset - 1 + limit;
  const actualEndOffset = Math.min(endOffset, metadata.count);
  const label = `${startOffset} - ${actualEndOffset} of ${metadata.count}`;

  const id = useId();

  const handleNextPage: MouseEventHandler<HTMLButtonElement> = () => {
    startTransition(async () => {
      addTransitionType("forwards");
      await setPagination({
        ...pagination,
        page: page + 1,
      });
    });
  };

  const handlePreviousPage: MouseEventHandler<HTMLButtonElement> = () => {
    startTransition(async () => {
      addTransitionType("backwards");
      await setPagination({
        ...pagination,
        page: page - 1,
      });
    });
  };

  const handleLimitChange = (newLimit: LimitItem) => {
    startTransition(async () => {
      await setPagination({
        ...pagination,
        limit: newLimit,
        page: 0,
      });
    });
  };

  return (
    <ViewTransition name="pagination">
      <div className={flex({ align: "center", justify: "space-between" })}>
        <p className={css({ color: "gray.500", fontSize: "sm" })}>{label}</p>
        <div className={flex({ align: "center", columnGap: 2 })}>
          <select
            className={css({ inlineSize: 10, blockSize: 8 })}
            id={id}
            onChange={(event) =>
              handleLimitChange(Number(event.target.value) as LimitItem)
            }
            value={limit}
          >
            {LIMITS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <PaginationButton disabled={page < 1} onClick={handlePreviousPage}>
            <FaChevronLeft className={square({ size: 6 })} />
          </PaginationButton>
          <PaginationButton
            disabled={!metadata.hasNextPage}
            onClick={handleNextPage}
          >
            <FaChevronRight className={square({ size: 6 })} />
          </PaginationButton>
        </div>
      </div>
    </ViewTransition>
  );
};

export { Pagination };
