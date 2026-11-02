import { css, cx } from "@styled-system/css";
import { cq } from "@styled-system/patterns";

/** Split thumb at the card's own `card-split` width (144px). */
export const MOST_LIKED_IMAGE_SIZES =
  "(min-width: 62.5rem) 144px, (min-width: 35rem) 45vw, 80vw";

export const sectionClassName = css({
  marginBlockStart: "clamp(2.5rem, 5vw, 4rem)",
});

export const headerClassName = css({
  alignItems: "baseline",
  columnGap: 8,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  rowGap: 3,
});

/**
 * Two files at tablet and desktop. Each card carries its own container so the
 * split/stacked switch follows the card's width, not the list's. Phones get the
 * snap rail: 82% cards so the next one shows, animated by the scroll timeline.
 * Heading and link come from the shared section tier.
 */
export const listClassName = cx(
  cq({ minInlineSize: 0, name: "models-grid" }),
  css({
    columnGap: 6,
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    marginBlockStart: 5,
    mobileDown: {
      "&::-webkit-scrollbar": { display: "none" },
      columnGap: 4,
      gridAutoColumns: "82%",
      gridAutoFlow: "column",
      gridTemplateColumns: "none",
      overflowX: "auto",
      overscrollBehaviorInline: "contain",
      scrollbarWidth: "none",
      scrollSnapType: "x mandatory",
    },
    rowGap: 4,
  }),
);

export const cardContainerClassName = cx(
  cq({ minInlineSize: 0, name: "most-liked" }),
  css({
    minInlineSize: 0,
    mobileDown: {
      // Motion is opt-in: nest under `_motionSafe` so reduce never sees a competing
      // `animation-name: none` atomic that can lose on stylesheet order (#211).
      _motionSafe: {
        _supportsScroll: {
          "--slide-distance": "1.25rem",
          animationDuration: "auto",
          animationFillMode: "both",
          animationName: "fade-in, slide-in",
          animationRange: "entry 0% cover 35%",
          animationTimeline: "view(inline)",
          animationTimingFunction: "glide",
        },
      },
      scrollSnapAlign: "start",
    },
  }),
);

export const cardSurfaceClassName = css({
  _hover: {
    boxShadow: "xl",
    translate: "0 -0.375rem",
  },
  "@most-liked/card-split": {
    gridTemplateColumns: "9rem minmax(0, 1fr)",
  },
  "&:has([data-progress='true']) *": { cursor: "progress" },
  backgroundColor: "bg.surface",
  blockSize: "full",
  cornerShape: "squircle",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  overflow: "hidden",
  position: "relative",
  rounded: "lg",
  shadow: "md",
  transitionDuration: "normal",
  transitionProperty: "translate,box-shadow",
  transitionTimingFunction: {
    _supportsLinear: "glide",
    base: "ease-in-out",
  },
});

export const mediaClassName = css({
  "@most-liked/card-split": {
    aspectRatio: "auto",
    blockSize: "full",
    minBlockSize: "9rem",
  },
  aspectRatio: "square",
  backgroundColor: "bg.muted",
  overflow: "hidden",
  position: "relative",
});

export const imageClassName = css({ objectFit: "cover" });

export const copyClassName = css({
  "@most-liked/card-split": { paddingInlineStart: 6 },
  display: "flex",
  flexDirection: "column",
  minInlineSize: 0,
  padding: 4,
});

export const titleClassName = css({
  color: "gray.800",
  fontFamily: "display",
  fontSize: { "@most-liked/card-split": "lg", base: "md" },
  fontWeight: "semibold",
  lineClamp: 2,
  lineHeight: "tight",
  margin: 0,
  minInlineSize: 0,
});

export const titleLinkClassName = css({
  _focusVisible: {
    outlineColor: "brand.ring",
    outlineOffset: 2,
    outlineStyle: "solid",
    outlineWidth: 2,
  },
  color: "inherit",
  textDecoration: "none",
});

export const linkOverlayClassName = css({
  blockSize: "full",
  inlineSize: "full",
  inset: 0,
  position: "absolute",
  zIndex: 20,
});

export const descriptionClassName = css({
  color: "text.secondary",
  fontSize: { "@most-liked/card-split": "0.875rem", base: "0.8125rem" },
  lineClamp: 2,
  lineHeight: 1.45,
  margin: 0,
  marginBlockStart: 2,
  minInlineSize: 0,
});

export const metaClassName = css({
  alignItems: "center",
  columnGap: 2,
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  marginBlockStart: 3,
  position: "relative",
  rowGap: 2,
  zIndex: 50,
});

export const categoryClassName = css({
  flex: "1 1 auto",
  minInlineSize: 0,
});

export const likeRowClassName = css({
  "& > form": {
    alignItems: "center",
    display: "flex",
  },
  flexShrink: 0,
});
