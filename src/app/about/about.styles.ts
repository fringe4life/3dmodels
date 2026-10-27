import { css, cx } from "@styled-system/css";
import { bleed, cq, grid, gridItem } from "@styled-system/patterns";

/** Matches root `siteContainer` `paddingInline` — use with `bleed({ inline })`. */
const SITE_CONTAINER_GUTTER = { base: 4, lg: 8, md: 6 } as const;

export const pageClassName = css({
  paddingBlockEnd: { base: 7, md: 0 },
  paddingBlockStart: "clamp(2.375rem, 4.8vw, 3.875rem)",
});

/** Container wrapper — layout queries run on the child grid. */
export const heroSectionClassName = cq({
  minInlineSize: 0,
  name: "about-story",
});

/** Stacked opening until `@about-story/story-split`. */
export const heroLayoutClassName = grid({
  "@about-story/story-split": {
    columnGap: 16,
    gridTemplateAreas: '"heading story" "band band"',
    gridTemplateColumns: "minmax(0, 1.02fr) minmax(0, 0.98fr)",
  },
  columnGap: 0,
  gridTemplateAreas: '"heading" "band" "story"',
  gridTemplateColumns: "minmax(0, 1fr)",
  minInlineSize: 0,
});

export const headingGroupClassName = gridItem({
  gridArea: "heading",
  minInlineSize: 0,
});

export const eyebrowClassName = css({
  "@about-story/story-split": { marginBlockEnd: "18px" },
  color: "text.secondary",
  fontSize: "15px",
  fontWeight: "semibold",
  lineHeight: 1.4,
  margin: 0,
  marginBlockEnd: 2.5,
  tabletDown: { fontSize: "sm" },
});

export const headingClassName = css({
  "@about-story/story-split": {
    "& > span": { display: "block" },
    fontSize: "clamp(2.75rem, 4.8vw, 3.875rem)",
    letterSpacing: "-0.055em",
    lineHeight: 1.03,
  },
  "& > span": { display: "inline" },
  fontFamily: "var(--font-montserrat)",
  fontSize: "clamp(2.0625rem, 9.2vw, 2.3125rem)",
  fontWeight: "bold",
  letterSpacing: "-0.06em",
  lineHeight: 1.03,
  margin: 0,
  textWrap: "balance",
});

export const storyClassName = cx(
  gridItem({
    "@about-story/story-split": {
      justifySelf: "end",
      marginBlockStart: 0,
      maxInlineSize: "28.25rem",
      paddingBlockStart: "clamp(2rem, 3.2vw, 3rem)",
      zIndex: "auto",
    },
    gridArea: "story",
    inlineSize: "full",
    marginBlockStart: 5,
    minInlineSize: 0,
    mobileDown: {
      backgroundColor: "bg.surface",
      marginBlockStart: -6,
      paddingBlockStart: 5,
      position: "relative",
      zIndex: 2,
    },
  }),
  css({
    "@about-story/story-split": {
      "& > p": { fontSize: "lg" },
      "& > p + p": { marginBlockStart: 5 },
    },
    "& > p": {
      color: "text.secondary",
      fontSize: "md",
      lineHeight: 1.6,
      margin: 0,
    },
    "& > p + p": { marginBlockStart: 4 },
  }),
);

export const bandFigureClassName = gridItem({
  blockSize: "clamp(11.25rem, 23.8vw, 17.875rem)",
  gridArea: "band",
  inlineSize: "full",
  margin: 0,
  marginBlockStart: {
    "@about-story/story-split": "clamp(2rem, 3.5vw, 2.75rem)",
    base: 5,
  },
  minInlineSize: 0,
  mobileDown: {
    aspectRatio: "354 / 274",
    blockSize: "auto",
    marginBlockStart: 5,
  },
  position: "relative",
});

/**
 * Desktop + mobile masks for about (`cog.svg` on small screens). Skip the home
 * tablet jigsaw — no copy sits in those cutouts here (#183).
 */
export const bandImageClassName = css({
  blockSize: "full",
  display: "block",
  inlineSize: "full",
  inset: 0,
  maskImage: "url(/masks/desktop.svg)",
  maskMode: "alpha",
  maskRepeat: "no-repeat",
  maskSize: "100% 100%",
  mobileDown: {
    maskImage: "url(/masks/cog.svg)",
  },
  objectFit: "cover",
  objectPosition: "center",
  position: "absolute",
});

export const pillarsSectionClassName = cx(
  cq({ minInlineSize: 0, name: "about-layers" }),
  css({
    marginBlockStart: { base: 8, md: "3.5rem" },
  }),
);

export const pillarsLayoutClassName = grid({
  "@about-layers/layers-split": {
    columnGap: 7,
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    rowGap: "46px",
  },
  columnGap: 0,
  gridTemplateColumns: "minmax(0, 1fr)",
  minInlineSize: 0,
  rowGap: 7,
});

const pillarTick = {
  backgroundColor: "border.subtle",
  blockSize: "1px",
  display: "block",
  inlineSize: 11,
  marginBlockEnd: 3.5,
} as const;

const pillarTitle = {
  fontSize: "1.3125rem",
  fontWeight: "semibold",
  letterSpacing: "-0.028em",
  lineHeight: 1.18,
  margin: 0,
} as const;

const pillarCopy = {
  color: "text.secondary",
  fontSize: "sm",
  lineHeight: 1.62,
  margin: 0,
  marginBlockStart: 2,
} as const;

/** Editorial layers field — three fixed pillars, placement via container query. */
export const pillarFirstClassName = cx(
  gridItem({ minInlineSize: 0 }),
  css({
    "@about-layers/layers-split": {
      "& > span": { inlineSize: "108px", marginBlockEnd: 5 },
      "& h3": {
        fontSize: "2.375rem",
        letterSpacing: "-0.038em",
        lineHeight: 1.08,
      },
      "& p": {
        fontSize: "md",
        lineHeight: 1.65,
        marginBlockStart: "18px",
        maxInlineSize: "53ch",
      },
      gridColumn: "1 / 7",
      gridRow: "1",
    },
    "& > span": pillarTick,
    "& h3": pillarTitle,
    "& p": pillarCopy,
  }),
);

export const pillarSecondClassName = cx(
  gridItem({ minInlineSize: 0 }),
  css({
    "@about-layers/layers-split": {
      "& > span": { inlineSize: "74px", marginBlockEnd: 5 },
      "& h3": {
        fontSize: "2.125rem",
        letterSpacing: "-0.038em",
        lineHeight: 1.08,
      },
      "& p": {
        fontSize: "md",
        lineHeight: 1.65,
        marginBlockStart: "15px",
        maxInlineSize: "46ch",
      },
      gridColumn: "8 / 13",
      gridRow: "1",
      marginBlockStart: 16,
    },
    "& > span": pillarTick,
    "& h3": pillarTitle,
    "& p": pillarCopy,
  }),
);

export const pillarThirdClassName = cx(
  gridItem({ minInlineSize: 0 }),
  css({
    "@about-layers/layers-split": {
      "& > span": { inlineSize: "46px", marginBlockEnd: 5 },
      "& h3": {
        fontSize: "1.875rem",
        letterSpacing: "-0.038em",
        lineHeight: 1.08,
      },
      "& p": {
        fontSize: "md",
        lineHeight: 1.65,
        marginBlockStart: 0,
        maxInlineSize: "50ch",
      },
      gridColumn: "3 / 13",
      gridRow: "2",
    },
    "& > span": pillarTick,
    "& h3": pillarTitle,
    "& p": pillarCopy,
  }),
);

export const pillarThirdRowClassName = grid({
  "@about-layers/layers-split": {
    columnGap: 14,
    gridTemplateColumns: "17rem minmax(0, 1fr)",
  },
  alignItems: "start",
  columnGap: 0,
  gridTemplateColumns: "minmax(0, 1fr)",
});

export const visionSectionClassName = cx(
  cq({ minInlineSize: 0, name: "about-vision" }),
  bleed({ inline: SITE_CONTAINER_GUTTER }),
  css({
    backgroundColor: "bg.subtle",
    marginBlockStart: { base: 8, md: "4.5rem" },
    paddingInline: SITE_CONTAINER_GUTTER,
  }),
);

export const visionLayoutClassName = grid({
  "@about-vision/vision-split": {
    columnGap: 16,
    gridTemplateColumns: "18.125rem minmax(0, 1fr)",
    paddingBlock: "76px",
    rowGap: 0,
  },
  gridTemplateColumns: "minmax(0, 1fr)",
  minInlineSize: 0,
  paddingBlock: "30px",
  rowGap: 4,
});

export const visionHeadingClassName = css({
  "@about-vision/vision-split": {
    fontSize: "clamp(2rem, 2.9vw, 2.375rem)",
  },
  fontSize: "1.5625rem",
  fontWeight: "bold",
  letterSpacing: "-0.035em",
  lineHeight: 1.1,
  margin: 0,
});

export const visionBodyClassName = css({
  "@about-vision/vision-split": {
    "& > p": { fontSize: "lg", lineHeight: 1.8 },
    "& > p + p": { marginBlockStart: 5 },
    paddingBlockStart: 1.5,
  },
  "& > p": {
    color: "text.secondary",
    fontSize: "md",
    lineHeight: 1.76,
    margin: 0,
  },
  "& > p + p": { marginBlockStart: 4 },
  maxInlineSize: "60ch",
  minInlineSize: 0,
  paddingBlockStart: 0,
});

export const ctaClassName = cx(
  "group",
  css({
    _active: {
      backgroundColor: "brand.subtle",
      translate: "0 0",
    },
    _focusVisible: {
      borderColor: "brand",
      outline: "3px solid token(colors.brand.ring)",
      outlineOffset: 1,
    },
    _hover: {
      backgroundColor: "color-mix(in oklab, token(colors.brand) 20%, white)",
      borderColor: "brand",
      translate: "0 -1px",
    },
    "@about-vision/vision-split": {
      gap: 3,
      marginBlockStart: "30px",
      minBlockSize: "52px",
      paddingInline: 6,
    },
    "& > svg": { color: "brand" },
    alignItems: "center",
    backgroundColor: "color-mix(in oklab, token(colors.brand) 12%, white)",
    borderColor: "brand",
    borderWidth: "2px",
    color: "text.primary",
    display: "inline-flex",
    fontSize: "sm",
    fontWeight: "bold",
    gap: 2.5,
    inlineSize: "fit-content",
    justifyContent: "center",
    marginBlockStart: "22px",
    minBlockSize: "47px",
    paddingBlock: 0,
    paddingInline: "17px",
    textDecoration: "none",
    transitionDuration: "fast",
    transitionProperty: "colors,translate",
    transitionTimingFunction: "outDramatic",
    whiteSpace: "nowrap",
  }),
);
