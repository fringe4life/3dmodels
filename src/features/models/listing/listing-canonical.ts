/**
 * Canonical URLs for listing routes (`/3d-models`, category listings).
 *
 * Uses nuqs `createLoader` + `createSerializer`. `clearOnDefault` is true by
 * default in nuqs v2+, so serialized URLs omit default `page`/`limit`/`sort`
 * and empty `query`, matching client parsers.
 *
 * @see https://nuqs.dev/docs/options#clear-on-default
 * @see https://nuqs.dev/docs/seo
 * @see node_modules/next/dist/docs/.../generate-metadata.md — `alternates.canonical`
 */
import type { Route } from "next";
import { createLoader, createSerializer, type SearchParams } from "nuqs/server";
import { toListingRoute } from "@/features/models/listing/listing-path";
import { searchParamsParsers } from "@/features/models/listing-search-params";

const loadListingCanonicalSearchParams = createLoader(searchParamsParsers);

const serializeListingCanonicalSearchParams = createSerializer(
  searchParamsParsers,
  {
    // clearOnDefault is true by default in nuqs v2+
    processUrlSearchParams: (search) => {
      search.sort();
      return search;
    },
  },
);

/**
 * Path + query string for `rel="canonical"`, aligned with nuqs defaults
 * (omits default `page`, `limit`, `sort`, and empty `query`).
 * Validated as a listing `Route` after serialize.
 */
export const canonicalPathForListing = async (
  pathname: Route,
  searchParams: Promise<SearchParams>,
): Promise<Route> => {
  const values = await loadListingCanonicalSearchParams(searchParams);
  return toListingRoute(
    serializeListingCanonicalSearchParams(pathname, values),
  );
};
