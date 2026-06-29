import { brand, type InferOutput, picklist, pipe, string } from "valibot";
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

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categorySlugSet.has(slug);
}

export function toCategorySlug(slug: Category["slug"]): CategorySlug {
  return slug as CategorySlug;
}
