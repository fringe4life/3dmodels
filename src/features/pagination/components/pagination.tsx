"use client";

import { between, hstack } from "@styled-system/patterns";
import { ViewTransition } from "react";
import { usePaginationQuery } from "@/features/pagination/hooks/use-pagination-query";
import type { PaginationMetadataObject } from "@/features/pagination/types";
import { PaginationLimitControl } from "./pagination-limit-control";
import { PaginationPageControl } from "./pagination-page-control";
import { PaginationSummary } from "./pagination-summary";

interface PaginationProps extends PaginationMetadataObject {}

const Pagination = ({ metadata: { hasNextPage, count } }: PaginationProps) => {
  const {
    pagination: { page, limit },
    handleNextPage,
    handlePreviousPage,
    handleLimitChange,
  } = usePaginationQuery();
  const hasPreviousPage = page < 1;

  return (
    <ViewTransition name="pagination">
      <div className={between()}>
        <PaginationSummary count={count} limit={limit} page={page} />
        <div className={hstack({ columnGap: 2 })}>
          <PaginationLimitControl
            limit={limit}
            onLimitChange={handleLimitChange}
          />
          <PaginationPageControl
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </div>
      </div>
    </ViewTransition>
  );
};

export { Pagination };
