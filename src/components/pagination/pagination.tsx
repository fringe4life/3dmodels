"use client";

import { between, hstack } from "@styled-system/patterns";
import { ViewTransition } from "react";
import type { PaginationMetadataObject } from "@/lib/pagination/types";
import { PaginationLimitControl } from "./pagination-limit-control";
import { PaginationPageControl } from "./pagination-page-control";
import { PaginationSummary } from "./pagination-summary";
import { usePaginationQuery } from "./use-pagination-query";

type PaginationProps = PaginationMetadataObject;

const Pagination = ({ metadata: { hasNextPage, count } }: PaginationProps) => {
  const {
    pagination: { page, limit },
    handleNextPage,
    handlePreviousPage,
    handleLimitChange,
  } = usePaginationQuery();
  const hasPreviousPage = page > 0;

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
