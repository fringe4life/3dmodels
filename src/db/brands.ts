import slugify from "slugify";
import { brand, type InferOutput, picklist, pipe, string } from "valibot";
import { MODEL_SLUGIFY_OPTIONS } from "@/lib/slugify";
import { CATEGORIES, type Category } from "./categories";

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
