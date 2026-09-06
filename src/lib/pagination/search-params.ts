import {
  parseAsInteger,
  parseAsNumberLiteral,
  parseAsString,
} from "nuqs/server";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  LIMITS,
} from "@/lib/pagination/constants";

/** URL key `query` — shared by server cache + `SearchInput`. */
export const queryParser = {
  query: parseAsString.withDefault(""),
};

export const pageParser = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
};

const limitParser = {
  limit: parseAsNumberLiteral(LIMITS).withDefault(DEFAULT_LIMIT),
};

export const paginationParser = {
  ...limitParser,
  ...pageParser,
};
