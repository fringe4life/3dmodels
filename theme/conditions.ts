import { defineConditions } from "@pandacss/dev";

export const conditions = defineConditions({
  extend: {
    error: "&:where([data-error='true'])",
    notFound: "&:where([data-not-found='true'])",
    notSupportsHover: "@media (hover: none)",
    notSupportsLinear:
      "@supports not (animation-timing-function: linear(0, 1))",
    notSupportsScroll: "@supports not (animation-timeline: scroll())",
    progress: "&:where([data-progress='true'])",
    supportsLinear: "@supports (animation-timing-function: linear(0, 1))",
    supportsScroll: "@supports (animation-timeline: scroll())",
  },
});
