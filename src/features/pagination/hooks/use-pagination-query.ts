"use client";

import { useQueryStates } from "nuqs";
import {
  addTransitionType,
  type MouseEventHandler,
  useTransition,
} from "react";
import {
  options as PaginationOptions,
  paginationParser,
} from "@/features/pagination/pagination-search-params";
import type { LimitItem, PaginationType } from "@/features/pagination/types";

interface UsePaginationQueryReturn {
  handleLimitChange: (newLimit: LimitItem) => void;
  handleNextPage: MouseEventHandler<HTMLButtonElement>;
  handlePreviousPage: MouseEventHandler<HTMLButtonElement>;
  isPending: boolean;
  pagination: PaginationType;
}

const usePaginationQuery = (): UsePaginationQueryReturn => {
  const [isPending, startTransition] = useTransition();
  const [pagination, setPagination] = useQueryStates(paginationParser, {
    ...PaginationOptions,
    startTransition,
  });

  const { page } = pagination;

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

  return {
    handleLimitChange,
    handleNextPage,
    handlePreviousPage,
    isPending,
    pagination,
  };
};

export { usePaginationQuery };
