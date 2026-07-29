import type { Options } from "nuqs/server";

/** Shared by all listing URL parsers (`clearOnDefault` + notify server). */
export const defaultOptions = {
  clearOnDefault: true,
  shallow: false,
} as const satisfies Options;
