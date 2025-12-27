"use client";

import { useQueryStates } from "nuqs";
import { PaginationView } from "@/features/pagination/components/pagination";
import {
  options as PaginationOptions,
  paginationParser,
} from "@/features/pagination/pagination-search-params";
import type { NuqsPaginationProps } from "../types";

const Pagination = ({ metadata }: NuqsPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    PaginationOptions,
  );

  return (
    <PaginationView
      metadata={metadata}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
};

export { Pagination };
