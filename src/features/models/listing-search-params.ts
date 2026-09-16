import { createSearchParamsCache } from "nuqs/server";
import { sortParser } from "@/features/models/sort/sort-search-params";
import {
  cursorPaginationParsers,
  limitParser,
  queryParser,
} from "@/lib/pagination/search-params";

export const searchParamsParsers = {
  ...sortParser,
  ...limitParser,
  ...cursorPaginationParsers,
  ...queryParser,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
