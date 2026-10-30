/**
 * Canonical URLs for listing routes (`/3d-models`, category listings).
 *
 * Uses nuqs `createLoader` + shared `listingHref` serializer.
 * `clearOnDefault` is true by default in nuqs v2+, so serialized URLs omit
 * default `cursor`/`direction`/`limit`/`sort` and empty `query`.
 *
 * @see https://nuqs.dev/docs/options#clear-on-default
 * @see https://nuqs.dev/docs/seo
 * @see node_modules/next/dist/docs/.../generate-metadata.md — `alternates.canonical`
 */
import type { Route } from "next";
import { createLoader, type SearchParams } from "nuqs/server";
import { listingHref } from "@/features/models/listing/listing-serialize";
import { searchParamsParsers } from "@/features/models/listing-search-params";

const loadListingCanonicalSearchParams = createLoader(searchParamsParsers);

/**
 * Path + query string for `rel="canonical"`, aligned with nuqs defaults
 * (omits default `cursor`, `direction`, `limit`, `sort`, and empty `query`).
 * Validated as a listing `Route` after serialize.
 */
export const canonicalPathForListing = async (
  pathname: Route,
  searchParams: Promise<SearchParams>,
): Promise<Route> => {
  const values = await loadListingCanonicalSearchParams(searchParams);
  return listingHref(pathname, values);
};
