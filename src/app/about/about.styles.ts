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

/**
 * Stacked opening until `@about-story/story-split`.
 *
 * At the split the heading takes the home-page display scale and the story
 * rail is sized to the measure it actually needs, so neither column carries
 * slack between the headline's last glyph and the prose's first.
 */
export const heroLayoutClassName = grid({
  "@about-story/story-split": {
    alignItems: "start",
    columnGap: 12,
    gridTemplateAreas: '"heading story" "band band"',
    gridTemplateColumns: "minmax(0, 1.45fr) minmax(18rem, 1fr)",
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
    // Home-page display scale (68px at 1440): both marketing heroes should
    // read at one weight. Tracking matches the system display faces' own
    // optical tightening, not Montserrat's -0.06em.
    fontSize: "clamp(3rem, 5.3vw, 4.25rem)",
    letterSpacing: "-0.032em",
    lineHeight: 1.02,
  },
  "& > span": { display: "inline" },
  fontFamily: "display",
  // Stacked hero (below the 48rem split): hold the home page's tablet presence
  // rather than shrinking to the phone scale as soon as the rail gives way.
  fontSize: "clamp(2.5rem, 6.4vw, 3.375rem)",
  fontWeight: "bold",
  letterSpacing: "-0.032em",
  lineHeight: 1.02,
  margin: 0,
  mobileDown: { fontSize: "clamp(2.0625rem, 9.2vw, 2.3125rem)" },
  textWrap: "balance",
});

export const storyClassName = cx(
  gridItem({
    "@about-story/story-split": {
      // Fills its rail instead of a narrower measure floating inside it.
      justifySelf: "stretch",
      marginBlockStart: 0,
      maxInlineSize: "none",
      // Eyebrow (15px × 1.4 = 21px) + its 18px gap, so the founding paragraph
      // starts on the headline's first line rather than under the eyebrow.
      paddingBlockStart: "2.4375rem",
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
      "& > p": { fontSize: "lg", lineHeight: 1.55 },
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
  blockSize: "clamp(10rem, 21vw, 15.5rem)",
  gridArea: "band",
  inlineSize: "full",
  margin: 0,
  marginBlockStart: 5,
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
    marginBlockStart: { base: 8, md: "3.25rem" },
  }),
);

/**
 * Three offerings on one row, each stepped down and scaled down from the last:
 * a shallow diagonal that still occupies the full width. Two staggered rows
 * left quadrant-sized holes between them.
 */
export const pillarsLayoutClassName = grid({
  "@about-layers/layers-split": {
    columnGap: 7,
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    rowGap: 0,
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
  letterSpacing: "-0.014em",
  lineHeight: 1.18,
  margin: 0,
} as const;

const pillarCopy = {
  color: "text.secondary",
  fontSize: "md",
  lineHeight: 1.62,
  margin: 0,
  marginBlockStart: 2,
} as const;

/** Field step + type step descend together — the stagger without the staircase. */
export const pillarFirstClassName = cx(
  gridItem({ minInlineSize: 0 }),
  css({
    "@about-layers/layers-split": {
      "& > span": { inlineSize: "96px", marginBlockEnd: 4 },
      "& h3": {
        fontSize: "2.25rem",
        letterSpacing: "-0.02em",
        lineHeight: 1.06,
      },
      "& p": {
        fontSize: "md",
        lineHeight: 1.62,
        marginBlockStart: 3,
      },
      gridColumn: "1 / 5",
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
      "& > span": { inlineSize: "64px", marginBlockEnd: 4 },
      "& h3": {
        fontSize: "2.0625rem",
        letterSpacing: "-0.02em",
        lineHeight: 1.06,
      },
      "& p": {
        fontSize: "md",
        lineHeight: 1.62,
        marginBlockStart: 3,
      },
      gridColumn: "5 / 9",
      gridRow: "1",
      marginBlockStart: 10,
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
      "& > span": { inlineSize: "40px", marginBlockEnd: 4 },
      "& h3": {
        fontSize: "1.875rem",
        letterSpacing: "-0.02em",
        lineHeight: 1.06,
      },
      "& p": {
        fontSize: "md",
        lineHeight: 1.62,
        marginBlockStart: 3,
      },
      gridColumn: "9 / 13",
      gridRow: "1",
      marginBlockStart: 20,
    },
    "& > span": pillarTick,
    "& h3": pillarTitle,
    "& p": pillarCopy,
  }),
);

export const visionSectionClassName = cx(
  cq({ minInlineSize: 0, name: "about-vision" }),
  bleed({ inline: SITE_CONTAINER_GUTTER }),
  css({
    backgroundColor: "bg.subtle",
    marginBlockStart: { base: 8, md: "3.75rem" },
    paddingInline: SITE_CONTAINER_GUTTER,
  }),
);

/**
 * Grid areas, not a rail wrapper: `Our Vision` opens the left rail and
 * `Browse Models` closes it, so the rail is anchored at both ends instead of
 * holding one short heading. Below the split the areas stack heading → prose →
 * action, so the button never splits the heading from the text it introduces.
 */
export const visionLayoutClassName = grid({
  "@about-vision/vision-split": {
    columnGap: 10,
    gridTemplateAreas: '"head body" "cta body"',
    gridTemplateColumns: "13.5rem minmax(0, 1fr)",
    gridTemplateRows: "auto minmax(0, 1fr)",
    paddingBlock: "3.5rem",
    rowGap: 0,
  },
  gridTemplateAreas: '"head" "body" "cta"',
  gridTemplateColumns: "minmax(0, 1fr)",
  minInlineSize: 0,
  paddingBlock: "1.875rem",
  rowGap: 5,
});

export const visionHeadingClassName = css({
  "@about-vision/vision-split": {
    fontSize: "clamp(2rem, 2.9vw, 2.375rem)",
  },
  alignSelf: "start",
  fontSize: "1.5625rem",
  fontWeight: "bold",
  gridArea: "head",
  letterSpacing: "-0.018em",
  lineHeight: 1.1,
  margin: 0,
});

/**
 * The two vision paragraphs read as a paired spread at desktop widths: two
 * honest measures instead of one 60ch block with a third of the band empty.
 */
export const visionBodyClassName = css({
  "@about-vision/vision-split": {
    "& > p": { fontSize: "lg", lineHeight: 1.75, margin: 0 },
    "& > p + p": { marginBlockStart: 0 },
  },
  "& > p": {
    color: "text.secondary",
    fontSize: "md",
    lineHeight: 1.76,
    margin: 0,
  },
  "& > p + p": { marginBlockStart: 4 },
  gridArea: "body",
  maxInlineSize: "none",
  minInlineSize: 0,
  tablet: {
    columnGap: 10,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  },
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
      alignSelf: "end",
      gap: 3,
      justifySelf: "start",
      marginBlockStart: 0,
      minBlockSize: "52px",
      paddingInline: 5,
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
    gridArea: "cta",
    inlineSize: "fit-content",
    justifyContent: "center",
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
