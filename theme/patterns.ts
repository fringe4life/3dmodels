import { definePattern } from "@pandacss/dev";

const between = definePattern({
  description:
    "creates a flex container, aligns items center and justifies between",
  transform({ properties }) {
    return {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      ...properties,
    };
  },
});

const hoverShadow = definePattern({
  description: "reveals a box shadow via an ::after pseudo-element on hover",
  properties: {
    shadow: { type: "token", value: "shadows" },
  },
  transform({ shadow }) {
    return {
      _after: {
        boxShadow: shadow,
        content: '""',
        inset: "0",
        opacity: "0",
        position: "absolute",
        rounded: "inherit",
        transitionDuration: "normal",
        transitionProperty: "opacity",
        zIndex: -1,
      },
      _hover: {
        _after: {
          opacity: "1",
        },
      },
      position: "relative",
    };
  },
});

/**
 * App chrome shell (`8xl` + gutters). Content columns use intentional caps
 * inside this shell — do not invent ad-hoc page widths:
 * - shell / wide: `siteContainer` (`8xl`) — navbar, main, footer, home hero
 * - prose: `4xl` — about / long reading
 * - article: `6xl` — model detail
 * - form: `md` — auth layouts
 * Local UI caps (popovers, media, CTAs) stay component-scoped.
 */
const siteContainer = definePattern({
  description:
    "centers site content with a shared maximum width and responsive inline gutters",
  transform({ properties }) {
    return {
      inlineSize: "full",
      marginInline: "auto",
      maxInlineSize: "8xl",
      paddingInline: { base: 4, lg: 8, md: 6 },
      ...properties,
    };
  },
});

export const patterns = {
  extend: {
    between,
    hoverShadow,
    siteContainer,
  },
};
