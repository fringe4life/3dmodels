import { css, cx } from "@styled-system/css";
import { hoverShadow } from "@styled-system/patterns";

/** Listing implicit rows per card: 4 content tracks + 1 gutter. */
const MODEL_CARD_LISTING_SPAN = 5;
const MODEL_CARD_CONTENT_SPAN = 4;

const modelCardTrackGrid = {
  display: "grid",
  gridColumn: "1 / -1",
  gridRow: `span ${MODEL_CARD_CONTENT_SPAN}`,
  gridTemplateAreas: {
    "@models-grid/card-split": `"media title" "media description" "media meta" "media meta"`,
    base: `"media" "title" "description" "meta"`,
  },
  gridTemplateColumns: {
    "@models-grid/card-split": "clamp(8rem, 40%, 10rem) minmax(0, 1fr)",
    base: "minmax(0, 1fr)",
  },
  gridTemplateRows: "subgrid",
  minInlineSize: 0,
  rowGap: 0,
} as const;

const modelCardContainer = css({
  _after: {
    blockSize: "6",
    content: '""',
    gridRow: MODEL_CARD_LISTING_SPAN,
    pointerEvents: "none",
  },
  display: "grid",
  gridRow: `span ${MODEL_CARD_LISTING_SPAN}`,
  gridTemplateRows: "subgrid",
  minInlineSize: 0,
  rowGap: 0,
});

const modelCardSurface = cx(
  css({
    ...modelCardTrackGrid,
    _hover: {
      translate: "0 calc(token(sizes.2) * -1)",
    },
    _notSupportsHover: {
      _supportsScroll: {
        animationDuration: "auto",
        animationFillMode: "forwards",
        animationName: "animateModelIn, animateModelOut",
        animationRange: "entry, exit 50%",
        animationTimeline: "view()",
        animationTimingFunction: "glide",
      },
    },
    "&:has([data-progress='true']) *": {
      cursor: "progress",
    },
    backgroundColor: "bg.surface",
    cornerShape: "squircle",
    cursor: "pointer",
    isolation: "isolate",
    overflow: "hidden",
    position: "relative",
    rounded: "lg",
    shadow: "md",
    transitionDuration: "normal",
    transitionProperty: "translate",
    transitionTimingFunction: {
      _supportsLinear: "glide",
      base: "ease-in-out",
    },
  }),
  hoverShadow({ shadow: "xl" }),
);

const modelCardMedia = css({
  "@models-grid/card-split": {
    aspectRatio: "auto",
    blockSize: "full",
    rounded: "inherit",
  },
  aspectRatio: "square",
  backgroundColor: "bg.muted",
  contain: "paint",
  cornerShape: "squircle",
  gridArea: "media",
  minInlineSize: 0,
  overflow: "hidden",
  position: "relative",
  roundedTop: "inherit",
});

const modelCardImage = css({ objectFit: "cover" });

const modelCardSkeletonSurface = css({
  ...modelCardTrackGrid,
  backgroundColor: "bg.surface",
  cornerShape: "squircle",
  overflow: "hidden",
  rounded: "lg",
  shadow: "md",
});

const modelCardTitle = css({
  color: "gray.800",
  fontSize: { "@models-grid/card-split": "1.125rem", base: "1rem" },
  fontWeight: "semibold",
  gridArea: "title",
  lineClamp: 2,
  lineHeight: "tight",
  minInlineSize: 0,
  paddingBlockStart: 4,
  paddingInline: {
    "@models-grid/card-split": 5,
    base: 4,
  },
});

const modelCardTitleLink = css({
  _focusVisible: {
    outlineColor: "brand.ring",
    outlineOffset: 2,
    outlineStyle: "solid",
    outlineWidth: 2,
  },
  color: "inherit",
  textDecoration: "none",
});

const modelCardLinkOverlay = css({
  blockSize: "full",
  inlineSize: "full",
  inset: 0,
  position: "absolute",
  zIndex: 20,
});

const modelCardDescription = css({
  "@models-grid/card-copy": {
    lineClamp: 3,
  },
  color: "text.secondary",
  fontSize: { "@models-grid/card-split": "0.875rem", base: "0.75rem" },
  gridArea: "description",
  lineClamp: 2,
  lineHeight: "normal",
  minInlineSize: 0,
  paddingBlockStart: 2,
  paddingInline: {
    "@models-grid/card-split": 5,
    base: 4,
  },
});

const modelCardMeta = css({
  alignItems: "center",
  columnGap: 2,
  display: "flex",
  flexWrap: "nowrap",
  gridArea: "meta",
  justifyContent: "space-between",
  paddingBlockEnd: 4,
  paddingBlockStart: 2,
  paddingInline: {
    "@models-grid/card-split": 5,
    base: 4,
  },
  position: "relative",
  rowGap: 2,
  zIndex: 50,
});

const modelCardCategory = css({
  flex: "1 1 auto",
  minInlineSize: 0,
});

const modelCardLikeRow = css({
  "& > form": {
    alignItems: "center",
    display: "flex",
  },
  flexShrink: 0,
});

export {
  modelCardCategory,
  modelCardContainer,
  modelCardDescription,
  modelCardImage,
  modelCardLikeRow,
  modelCardLinkOverlay,
  modelCardMedia,
  modelCardMeta,
  modelCardSkeletonSurface,
  modelCardSurface,
  modelCardTitle,
  modelCardTitleLink,
};
