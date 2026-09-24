import "server-only";

import slugify from "slugify";
import type { ModelSlug } from "@/db/brands";
import { MODEL_SLUGIFY_OPTIONS } from "@/lib/slugify";

/**
 * True when `slug` is non-empty and already stable under {@link MODEL_SLUGIFY_OPTIONS}.
 */
export function isModelSlug(slug: string): slug is ModelSlug {
  return slug.length > 0 && slugify(slug, MODEL_SLUGIFY_OPTIONS) === slug;
}
