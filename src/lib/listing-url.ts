import { DEFAULT_CURSOR, DEFAULT_DIRECTION } from "@/lib/pagination/constants";

/**
 * Shared listing query cleanup for serializers (canonical + client writes).
 * Drops orphan `direction` when `cursor` is absent; sorts keys for stable URLs.
 */
export const processListingUrlSearchParams = (
  search: URLSearchParams,
): URLSearchParams => {
  if (!search.has("cursor")) {
    search.delete("direction");
  }
  search.sort();
  return search;
};

/** Pass into serializer patches that should start a new result page. */
export const resetPager = {
  cursor: DEFAULT_CURSOR,
  direction: DEFAULT_DIRECTION,
} as const;
