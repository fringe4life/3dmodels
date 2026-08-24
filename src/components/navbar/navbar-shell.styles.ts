import { css, cx } from "@styled-system/css";
import { stack } from "@styled-system/patterns";
import { MOBILE_NAVIGATION_ID } from "./constants";

/** Must match `MOBILE_NAVIGATION_ID` — used in `:has()` hamburger-open selectors below. */
const mobileNavigationSelector = `#${MOBILE_NAVIGATION_ID}`;

export const navbarShellClassName = cx(
  stack({
    _supportsScroll: {
      animationFillMode: "both",
      animationName: "navAnimation",
      animationRange: "100px 200px",
      animationTimeline: "scroll()",
      animationTimingFunction: "linear",
    },
    backdropBlur: "sm",
    backgroundColor: "white/65",
    borderBottomColor: "gray.400/20",
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    insetBlockStart: 0,
    insetInline: 0,
    paddingBlock: 4,
    paddingInline: { base: 2, sm: 6 },
    position: "sticky",
    transitionDuration: "normal",
    transitionProperty: "translate,border-radius",
    transitionTimingFunction: "soft",
    zIndex: "20",
  }),
  css({
    [`&:has(${mobileNavigationSelector}:popover-open) .mobile-menu-glyph [data-line="bottom"]`]:
      {
        transform: "translateY(-5px) rotate(-45deg)",
      },
    [`&:has(${mobileNavigationSelector}:popover-open) .mobile-menu-glyph [data-line="middle"]`]:
      {
        transform: "scaleX(0)",
        transitionDelay: "0ms",
      },
    [`&:has(${mobileNavigationSelector}:popover-open) .mobile-menu-glyph [data-line="top"]`]:
      {
        transform: "translateY(5px) rotate(45deg)",
      },
  }),
);
