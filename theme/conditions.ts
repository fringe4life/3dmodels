import { defineConditions } from "@pandacss/dev";

export const conditions = defineConditions({
  extend: {
    error: "&:where([data-error='true'])",
    // Precise pointer that can hover *and* has not asked for less motion: the
    // only input on which auto-running motion is allowed, because the user can
    // stop it by pointing at the row. Anything gated on this condition is
    // absent in the reduced-motion state rather than switched off inside it, so
    // the still state is the base styles and nothing can out-cascade it.
    finePointerMotion:
      "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    notFound: "&:where([data-not-found='true'])",
    notSupportsHover: "@media (hover: none)",
    notSupportsLinear:
      "@supports not (animation-timing-function: linear(0, 1))",
    notSupportsScroll: "@supports not (animation-timeline: scroll())",
    progress: "&:where([data-progress='true'])",
    scrollableEnd: "@container scroll-state(scrollable: inline-end)",
    // Scroll-state queries: true only while the container can still be scrolled
    // towards that edge, so an edge fade can appear and retire on its own. A
    // browser without them simply never matches, leaving the fade transparent.
    scrollableStart: "@container scroll-state(scrollable: inline-start)",
    // The states where the row is a scroller rather than a belt: no hover to stop
    // it with, or the reader asked for less motion. Complement of
    // `finePointerMotion` above.
    scrollerRail:
      "@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)",
    supportsLinear: "@supports (animation-timing-function: linear(0, 1))",
    supportsScroll: "@supports (animation-timeline: scroll())",
  },
});
