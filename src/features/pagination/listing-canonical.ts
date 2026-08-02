/**
 * Canonical URLs for listing routes (`/3d-models`, category listings).
 *
 * Uses nuqs `createLoader` + `createSerializer` with `clearOnDefault: true` so
 * serialized URLs match client parsers (`listingSearchParamsOptions`).
 *
 * @see https://nuqs.dev/docs/seo (nuqs README SEO section)
 * @see node_modules/next/dist/docs/.../generate-metadata.md — `alternates.canonical`
 */
import type { Route } from "next";
import { createLoader, createSerializer, type SearchParams } from "nuqs/server";
import { toListingRoute } from "@/features/pagination/listing-path";
import { searchParamsParsers } from "@/features/pagination/pagination-search-params";

const loadListingCanonicalSearchParams = createLoader(searchParamsParsers);

const serializeListingCanonicalSearchParams = createSerializer(
  searchParamsParsers,
  {
    clearOnDefault: true,
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
