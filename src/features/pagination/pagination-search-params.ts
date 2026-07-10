import {
  createSearchParamsCache,
  type Options,
  parseAsInteger,
  parseAsNumberLiteral,
  parseAsString,
} from "nuqs/server";
import { sortParser } from "@/features/models/sort/sort-search-params";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  LIMITS,
} from "@/features/pagination/constants";

export const options: Options = {
  clearOnDefault: true,
  shallow: false,
};

/** URL key `query` — must match `SearchInput` (`useQueryState("query", …)`). */
const queryParser = parseAsString.withDefault("").withOptions({
  ...options,
});

export const paginationParser = {
  limit: parseAsNumberLiteral(LIMITS).withDefault(DEFAULT_LIMIT),
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
};

export const searchParamsParsers = {
  query: queryParser,
  sort: sortParser.withOptions({ ...options }),
  ...paginationParser,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
