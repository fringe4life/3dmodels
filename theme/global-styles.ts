import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  "h1, h2, h3, h4, h5, h6": {
    fontFamily: "var(--font-montserrat)",
  },
  html: {
    containerType: "scroll-state",
    fontFamily: "var(--font-albert-sans)",
    scrollBehavior: "smooth",
    scrollbarGutter: "stable",
    scrollbarWidth: "thin",
  },
});
