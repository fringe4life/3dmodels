"use client";

import { useQueryStates } from "nuqs";
import Pagination from "@/features/pagination/components/pagination";
import {
  options as PaginationOptions,
  paginationParser,
} from "@/features/pagination/pagination-search-params";
import type { PaginationMetadata } from "@/features/pagination/types";

export type ModelsPaginationProps = {
  metadata: PaginationMetadata;
};

const ModelsPagination = ({ metadata }: ModelsPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    PaginationOptions,
  );

  return (
    <Pagination
      metadata={metadata}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
};

export default ModelsPagination;
