import {
  createParser,
  parseAsNumberLiteral,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { parseModelId } from "@/db/brands";
import {
  DEFAULT_CURSOR,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  DIRECTIONS,
  LIMITS,
} from "@/lib/pagination/constants";

/** URL key `query` — shared by server cache + `SearchInput`. */
export const queryParser = {
  query: parseAsString.withDefault(""),
};

export const limitParser = {
  limit: parseAsNumberLiteral(LIMITS).withDefault(DEFAULT_LIMIT),
};

const parseAsListingCursor = createParser<string>({
  parse: (value): string | null => {
    if (value === DEFAULT_CURSOR) {
      return DEFAULT_CURSOR;
    }
    return parseModelId(value) ?? null;
  },
  serialize: (value) => value,
}).withDefault(DEFAULT_CURSOR);

export const cursorPaginationParsers = {
  cursor: parseAsListingCursor,
  direction: parseAsStringLiteral(DIRECTIONS).withDefault(DEFAULT_DIRECTION),
};
