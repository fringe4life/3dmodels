"use client";

import { useQueryStates } from "nuqs";
import { useTransition } from "react";
import type { Sort } from "@/features/models/sort/brands";
import { toSort } from "@/features/models/sort/brands";
import { DEFAULT_SORT } from "@/features/models/sort/constants";
import { sortParser } from "@/features/models/sort/sort-search-params";
import { DEFAULT_PAGE } from "@/features/pagination/constants";
import {
  options as PaginationOptions,
  paginationParser,
} from "@/features/pagination/pagination-search-params";

interface UseSortQueryReturn {
  handleSortChange: (next: Sort) => void;
  isPending: boolean;
  sort: Sort;
}

const useSortQuery = (): UseSortQueryReturn => {
  const [isPending, startTransition] = useTransition();
  const [{ sort }, setSortState] = useQueryStates(
    {
      page: paginationParser.page,
      sort: sortParser,
    },
    {
      ...PaginationOptions,
      startTransition,
    },
  );

  const handleSortChange = (next: Sort) => {
    if (next === sort) {
      return;
    }

    startTransition(async () => {
      await setSortState({
        page: DEFAULT_PAGE,
        sort: next,
      });
    });
  };

  return {
    handleSortChange,
    isPending,
    sort: toSort(sort ?? DEFAULT_SORT),
  };
};

export { useSortQuery };
