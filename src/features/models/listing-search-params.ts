import { createSearchParamsCache } from "nuqs/server";
import { sortParser } from "@/features/models/sort/sort-search-params";
import { paginationParser, queryParser } from "@/lib/pagination/search-params";

export const searchParamsParsers = {
  ...sortParser,
  ...paginationParser,
  ...queryParser,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
