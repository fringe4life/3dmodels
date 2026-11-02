import { css } from "@styled-system/css";

/**
 * Marketing section heading tier. Both home page rows (`Most liked`, the about
 * teaser) are siblings, so they share one size — page order carries priority,
 * not the type scale. Placement (grid area, measure) stays with the caller.
 */
export const sectionHeadingClassName = css({
  fontFamily: "display",
  fontSize: "2xl",
  fontWeight: "semibold",
  lineHeight: "1.2",
  margin: 0,
});
