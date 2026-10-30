/**
 * Shared listing URL serializer for canonical metadata and shell/results writes.
 * Same parsers + `processListingUrlSearchParams` as SEO canonicals.
 */
import type { Route } from "next";
import { createSerializer, type inferParserType } from "nuqs/server";
import { toListingRoute } from "@/features/models/listing/listing-path";
import { searchParamsParsers } from "@/features/models/listing-search-params";
import { processListingUrlSearchParams } from "@/lib/listing-url";

export type ListingSearchValues = inferParserType<typeof searchParamsParsers>;

const serializeListingSearchParams = createSerializer(searchParamsParsers, {
  processUrlSearchParams: processListingUrlSearchParams,
});

/** Serialize listing values onto a path/search base and validate as a listing `Route`. */
export const listingHref = (
  base: string,
  values: Partial<ListingSearchValues>,
): Route => toListingRoute(serializeListingSearchParams(base, values));
