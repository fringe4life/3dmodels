import type slugify from "slugify";

/**
 * Object form of slugify's 2nd arg (excludes the string `replacement` shorthand).
 * `import type` gives the function type, so use `Parameters<slugify>` (no `typeof`).
 */
type SlugifyOptions = Exclude<
  NonNullable<Parameters<typeof slugify>[1]>,
  string
>;

/**
 * App-wide slugify settings for model slugs.
 * slugify ships no public output regex; validate with idempotency under these options.
 */
export const MODEL_SLUGIFY_OPTIONS = {
  lower: true,
  strict: true,
} as const satisfies SlugifyOptions;
