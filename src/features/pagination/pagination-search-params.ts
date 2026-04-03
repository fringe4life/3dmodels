import {
  createSearchParamsCache,
  type Options,
  parseAsInteger,
  parseAsNumberLiteral,
  parseAsString,
} from "nuqs/server";
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
export const queryParser = parseAsString.withDefault("").withOptions({
  ...options,
});

export const paginationParser = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsNumberLiteral(LIMITS).withDefault(DEFAULT_LIMIT),
};

export const searchParamsParsers = {
  query: queryParser,
  ...paginationParser,
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
