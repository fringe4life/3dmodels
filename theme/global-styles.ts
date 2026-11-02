import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  // Font buckets are `tokens.fonts` in `theme/tokens.ts`.
  "code, kbd, pre, samp": {
    fontFamily: "mono",
  },
  "h1, h2, h3, h4, h5, h6": {
    fontFamily: "display",
  },
  html: {
    containerType: "scroll-state",
    fontFamily: "sans",
    scrollBehavior: "smooth",
    scrollbarGutter: "stable",
    scrollbarWidth: "thin",
  },
});
