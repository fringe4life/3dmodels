import slugify from "slugify";
import {
  brand,
  type InferOutput,
  picklist,
  pipe,
  regex,
  safeParse,
  string,
} from "valibot";
import { MODEL_SLUGIFY_OPTIONS } from "@/lib/slugify";
import { CATEGORIES, type Category } from "./categories";

/** RFC 9562 UUID v7: version nibble `7`, RFC 4122 variant `8|9|a|b`. */
const UUID_V7_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const categorySlugValues = CATEGORIES.map((category) => category.slug) as [
  Category["slug"],
  ...Category["slug"][],
];

const categorySlugSet = new Set<string>(categorySlugValues);

const categorySlugSchema = pipe(
  picklist(categorySlugValues),
  brand("CategorySlug"),
);

export type CategorySlug = InferOutput<typeof categorySlugSchema>;

const userIdSchema = pipe(string(), brand("User"));

export type User = InferOutput<typeof userIdSchema>;

const modelSlugSchema = pipe(string(), brand("ModelSlug"));

export type ModelSlug = InferOutput<typeof modelSlugSchema>;

const modelIdSchema = pipe(
  string(),
  regex(UUID_V7_REGEX, "A valid UUID v7 string"),
  brand("ModelId"),
);

export type ModelId = InferOutput<typeof modelIdSchema>;

export function toModelId(id: string): ModelId {
  return id as ModelId;
}

export function parseModelId(value: string): ModelId | undefined {
  const result = safeParse(modelIdSchema, value);
  return result.success ? result.output : undefined;
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categorySlugSet.has(slug);
}

export function toCategorySlug(slug: Category["slug"]): CategorySlug {
  return slug as CategorySlug;
}

/**
 * True when `slug` is non-empty and already stable under {@link MODEL_SLUGIFY_OPTIONS}.
 */
export function isModelSlug(slug: string): slug is ModelSlug {
  return slug.length > 0 && slugify(slug, MODEL_SLUGIFY_OPTIONS) === slug;
}
