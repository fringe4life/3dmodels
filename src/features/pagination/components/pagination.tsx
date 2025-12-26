"use client";
import type { MouseEventHandler } from "react";
import { startTransition } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { LIMITS } from "@/features/pagination/pagination-search-params";
import type { LimitItem, PaginationProps } from "../types";

const Pagination = ({
  pagination,
  setPagination,
  metadata,
}: PaginationProps) => {
  const { page, limit } = pagination;
  const startOffset = page * limit + 1;
  const endOffset = startOffset - 1 + limit;
  const actualEndOffset = Math.min(endOffset, metadata.count);

  const label = `${startOffset} - ${actualEndOffset} of ${metadata.count}`;

  const handleNextPage: MouseEventHandler<HTMLButtonElement> = () => {
    startTransition(() => {
      setPagination({
        ...pagination,
        page: page + 1,
      });
    });
  };

  const handlePreviousPage: MouseEventHandler<HTMLButtonElement> = () => {
    startTransition(() => {
      setPagination({
        ...pagination,
        page: page - 1,
      });
    });
  };

  const handleLimitChange = (newLimit: LimitItem) => {
    startTransition(() => {
      setPagination({
        ...pagination,
        limit: newLimit,
        page: 0,
      });
    });
  };

  const nextButton = (
    <button
      className="cursor-pointer text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={!metadata.hasNextPage}
      onClick={handleNextPage}
      type="button"
    >
      <FaChevronRight />
    </button>
  );

  const previousButton = (
    <button
      className="cursor-pointer text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={page < 1}
      onClick={handlePreviousPage}
      type="button"
    >
      <FaChevronLeft />
    </button>
  );

  const limitDropdown = (
    <select
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
    <div className="flex items-center justify-between">
      <p className="text-gray-500 text-sm">{label}</p>
      <div className="flex items-center gap-x-2">
        {limitDropdown}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export default Pagination;
