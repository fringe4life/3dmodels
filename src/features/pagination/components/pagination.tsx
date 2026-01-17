"use client";

import { useQueryStates } from "nuqs";
import {
  addTransitionType,
  type MouseEventHandler,
  startTransition,
  useId,
  ViewTransition,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LIMITS } from "@/features/pagination/constants";
import {
  options as PaginationOptions,
  paginationParser,
} from "@/features/pagination/pagination-search-params";
import type { LimitItem } from "@/features/pagination/types";
import type { PaginationProps } from "../types";

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

  const limitDropdown = (
    <select
      className="h-10"
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
  );

  return (
    <ViewTransition name="pagination">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{label}</p>
        <div className="flex items-center gap-x-2">
          {limitDropdown}
          <button
            className="h-10 cursor-pointer text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page < 1}
            onClick={handlePreviousPage}
            type="button"
          >
            <FaChevronLeft className="aspect-square h-10" />
          </button>
          <button
            className="h-10 cursor-pointer text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!metadata.hasNextPage}
            onClick={handleNextPage}
            type="button"
          >
            <FaChevronRight className="aspect-square h-10" />
          </button>
        </div>
      </div>
    </ViewTransition>
  );
};

export { Pagination };
