/**
 * Object form of slugify's 2nd arg (excludes the string `replacement` shorthand).
 *
 * Prefer `typeof import("slugify")` over `import type slugify`:
 * the package is `export =` + `export as namespace`, so a type-only default
 * import is the namespace (TS2709 if used as `Parameters<slugify>`).
 * `typeof` yields the callable; `Parameters` then works.
 */
type SlugifyOptions = Exclude<
  NonNullable<Parameters<typeof import("slugify")>[1]>,
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
