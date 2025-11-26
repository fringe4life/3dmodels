"use client";

import { useQueryStates } from "nuqs";
import Pagination from "@/components/pagination";
import {
  options as PaginationOptions,
  paginationParser,
} from "@/features/models/pagination-search-params";
import type { PaginationMetadata } from "@/types";

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
