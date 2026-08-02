import type { Route } from "next";
import {
  createLoader,
  createSerializer,
  parseAsString,
  type SearchParams,
} from "nuqs/server";
import { isModelSlug } from "@/db/brands";
import {
  DEFAULT_LISTING_HREF,
  toListingRoute,
} from "@/features/pagination/listing-path";

/** Detail-page query key carrying the listing path (+ search) to restore. */
const fromSearchParamsParsers = {
  from: parseAsString,
};

const loadFromSearchParams = createLoader(fromSearchParamsParsers);

const serializeModelDetailSearchParams = createSerializer(
  fromSearchParamsParsers,
);

const MODEL_DETAIL_PATH = /^\/3d-models\/([^/]+)$/;

/**
 * Runtime check for `/3d-models/{slug}` with optional query.
 * Type predicate narrows to `Route` without call-site casts.
 */
const isModelDetailRoute = (href: string): href is Route => {
  try {
    const url = new URL(href, "http://local.invalid");
    if (url.origin !== "http://local.invalid") {
      return false;
    }

    const match = MODEL_DETAIL_PATH.exec(url.pathname);
    return Boolean(match?.[1] && isModelSlug(match[1]));
  } catch {
    return false;
  }
};

const toModelDetailRoute = (href: string, slugFallback: string): Route => {
  if (isModelDetailRoute(href)) {
    return href;
  }

  const fallback = `/3d-models/${slugFallback}`;
  if (isModelDetailRoute(fallback)) {
    return fallback;
  }

  return DEFAULT_LISTING_HREF;
};

/** Build detail href with validated `from` listing return path. */
export const modelDetailHref = (slug: string, returnTo: Route): Route => {
  if (!isModelSlug(slug)) {
    return DEFAULT_LISTING_HREF;
  }

  return toModelDetailRoute(
    serializeModelDetailSearchParams(`/3d-models/${slug}`, {
      from: returnTo,
    }),
    slug,
  );
};

export const resolveBackHref = async (
  searchParams: Promise<SearchParams>,
): Promise<Route> => {
  const { from } = await loadFromSearchParams(searchParams);
  return toListingRoute(from ?? "");
};
