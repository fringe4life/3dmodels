import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";

interface MobileMenuButtonProps {
  navigationId: string;
}

const mobileMenuButtonClassName = cx(
  square({ size: 9 }),
  css({
    _active: { scale: "0.95" },
    _focusVisible: {
      outline: "none",
      ring: 2,
      ringColor: "brand.ring",
      ringOffset: 2,
    },
    _hover: {
      backgroundColor: "bg.muted",
      borderColor: "brand",
    },
    alignItems: "center",
    anchorName: "--mobile-menu-trigger",
    backgroundColor: "bg.surface",
    borderColor: "border.strong",
    borderWidth: 1,
    color: "text.primary",
    display: { base: "inline-flex", sm: "none" },
    justifyContent: "center",
    rounded: "md",
    transitionDuration: "normal",
    transitionProperty: "background-color,border-color,scale",
    transitionTimingFunction: "soft",
  }),
);

const mobileMenuGlyphClassName = cx(
  square({ size: 5 }),
  css({
    _motionReduce: {
      "& line": {
        transitionDelay: "0ms",
        transitionDuration: "0ms",
      },
    },
    "& [data-line=middle]": {
      transitionDelay: "155ms",
      transitionDuration: "55ms",
      transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
    },
    "& line": {
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: 1.9,
      transformBox: "fill-box",
      transformOrigin: "center",
      transitionDuration: "210ms",
      transitionProperty: "transform",
      transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
      vectorEffect: "non-scaling-stroke",
    },
    display: "block",
    overflow: "visible",
  }),
);

const MobileMenuButton = ({ navigationId }: MobileMenuButtonProps) => (
  <button
    aria-controls={navigationId}
    aria-label="Navigation menu"
    className={mobileMenuButtonClassName}
    popoverTarget={navigationId}
    type="button"
  >
    <svg
      aria-hidden="true"
      className={cx("mobile-menu-glyph", mobileMenuGlyphClassName)}
      viewBox="0 0 24 24"
    >
      <line data-line="top" x1="5" x2="19" y1="7" y2="7" />
      <line data-line="middle" x1="5" x2="19" y1="12" y2="12" />
      <line data-line="bottom" x1="5" x2="19" y1="17" y2="17" />
    </svg>
  </button>
);

export { MobileMenuButton };
