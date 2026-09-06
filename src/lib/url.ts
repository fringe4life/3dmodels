import type { Options } from "nuqs/server";

/**
 * Shared listing adapter options (`shallow: false` notifies the server).
 * `clearOnDefault` is true by default in nuqs v2+ — omit from URL when
 * state matches parser default. Set `false` only to keep default keys.
 *
 * @see https://nuqs.dev/docs/options#clear-on-default
 */
export const defaultOptions = {
  shallow: false,
} as const satisfies Options;
