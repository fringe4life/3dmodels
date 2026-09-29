import { definePositionTry } from "@pandacss/dev";

/**
 * Named `@position-try` bags for guest heart sign-in hint.
 * Replaces raw `flip-block` / `flip-inline` try-tactics with typed,
 * tree-shaken fallbacks (Panda v2 `positionTry()` factory).
 */
export const positionTry = definePositionTry({
  /** Prefer opposite block side when `position-area: top` overflows. */
  heartHintBottom: {
    positionArea: "bottom",
  },
  /** Prefer inline-end when top / start placements overflow. */
  heartHintInlineEnd: {
    positionArea: "right",
  },
  /** Prefer inline-start when top placement overflows. */
  heartHintInlineStart: {
    positionArea: "left",
  },
});
