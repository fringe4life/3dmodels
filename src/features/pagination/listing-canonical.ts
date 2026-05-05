/**
 * Canonical URLs for listing routes (`/3d-models`, category listings).
 *
 * Uses nuqs `createLoader` + `createSerializer` with `clearOnDefault: true` so
 * serialized URLs match client hooks (`clearOnDefault` in pagination options).
 *
 * @see https://nuqs.dev/docs/seo (nuqs README SEO section)
 * @see node_modules/next/dist/docs/.../generate-metadata.md — `alternates.canonical`
 */
import { createLoader, createSerializer, type SearchParams } from "nuqs/server";
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
 * (omits default `page`, `limit`, and empty `query`).
 */
export const canonicalPathForListing = async (
  pathname: string,
  searchParams: Promise<SearchParams>,
): Promise<string> => {
  const values = await loadListingCanonicalSearchParams(searchParams);
  return serializeListingCanonicalSearchParams(pathname, values);
};
