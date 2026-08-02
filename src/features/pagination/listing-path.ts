import type { Route } from "next";
import { isCategorySlug } from "@/db/brands";

export const DEFAULT_LISTING_HREF = "/3d-models" as const satisfies Route;

const LISTING_URL_BASE = "http://local.invalid";

const CATEGORY_LISTING_PATH = /^\/3d-models\/categories\/([^/]+)$/;

const isListingPathname = (pathname: string): boolean => {
  if (pathname === DEFAULT_LISTING_HREF) {
    return true;
  }

  const categoryMatch = CATEGORY_LISTING_PATH.exec(pathname);
  return Boolean(categoryMatch?.[1] && isCategorySlug(categoryMatch[1]));
};

/**
 * Runtime check that `href` is a same-app listing path
 * (`/3d-models` or `/3d-models/categories/{validSlug}`) with optional query.
 * Type predicate narrows to `Route` without call-site casts.
 */
const isListingRoute = (href: string): href is Route => {
  try {
    const url = new URL(href, LISTING_URL_BASE);
    if (url.origin !== LISTING_URL_BASE) {
      return false;
    }

    return isListingPathname(url.pathname);
  } catch {
    return false;
  }
};

/**
 * Validate listing href → relative `Route` (pathname + search only),
 * else default listing. Always rebuilds path so absolute/`//` forms cannot leak.
 */
export const toListingRoute = (href: string): Route => {
  if (!isListingRoute(href)) {
    return DEFAULT_LISTING_HREF;
  }

  try {
    const url = new URL(href, LISTING_URL_BASE);
    const normalized = `${url.pathname}${url.search}`;
    return isListingRoute(normalized) ? normalized : DEFAULT_LISTING_HREF;
  } catch {
    return DEFAULT_LISTING_HREF;
  }
};
