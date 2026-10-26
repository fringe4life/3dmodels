import { css, cx } from "@styled-system/css";
import { grid } from "@styled-system/patterns";
import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";
import {
  MarketingHeroImage,
  MarketingHeroImagePreload,
} from "@/components/marketing/marketing-hero-image";
import {
  MARKETING_HERO_IMAGE_TRANSITION,
  MARKETING_HERO_TITLE_TRANSITION,
} from "@/lib/marketing-view-transitions";

// Marketing: static shell + Link prefetch={true}. Session deferred via
// getUser() → navigation() so this route stays statically prerenderable.
export const ensureStatic = "prefetch";

export const metadata: Metadata = {
  description:
    "Welcome to PrintForge - your go-to platform for discovering and sharing 3D printing models. Join our community of makers and explore thousands of STL files.",
  openGraph: {
    description:
      "Join our community of creators and explore a vast library of user-submitted 3D printing models.",
    title: "PrintForge - Discover 3D Printing Models",
  },
  title: "Home",
};

const pageSpacingClassName = css({
  mobileDown: {
    paddingBlockEnd: 7,
    paddingBlockStart: 6,
  },
  paddingBlockEnd: 8,
  paddingBlockStart: "clamp(2.375rem, 5vw, 4rem)",
  tabletDown: {
    paddingBlockStart: 8,
  },
});

const heroClassName = grid({
  alignItems: "end",
  columnGap: "clamp(2.125rem, 6vw, 5.125rem)",
  gridTemplateAreas: '"heading copy" "visual visual"',
  gridTemplateColumns: "minmax(0, 1.7fr) minmax(17rem, 0.75fr)",
  mobileDown: {
    gridTemplateAreas: '"eyebrow" "stage"',
  },
  rowGap: 0,
  tabletDown: {
    columnGap: 0,
    gridTemplateAreas: '"heading" "stage"',
    gridTemplateColumns: "minmax(0, 1fr)",
  },
});

const headingGroupClassName = css({
  gridArea: "heading",
  minInlineSize: 0,
  mobileDown: {
    display: "contents",
    marginBlockEnd: 0,
  },
  tabletDown: {
    marginBlockEnd: 4.5,
  },
});

const eyebrowClassName = css({
  color: "text.secondary",
  fontSize: "15px",
  fontWeight: "medium",
  lineHeight: "1.4",
  marginBlockEnd: "15px",
  mobileDown: {
    fontSize: "sm",
    gridArea: "eyebrow",
    marginBlockEnd: 2.5,
  },
});

const headingClassName = css({
  fontFamily: "var(--font-montserrat)",
  fontSize: "clamp(3rem, 5.3vw, 4.25rem)",
  fontWeight: "bold",
  letterSpacing: "-0.06em",
  lineHeight: "1.02",
  margin: 0,
  maxInlineSize: "50rem",
  mobileDown: {
    alignSelf: "start",
    fontSize: "clamp(2.1875rem, 10vw, 2.5rem)",
    gridArea: "stage",
    inlineSize: "full",
    letterSpacing: "-0.065em",
    maxInlineSize: "none",
    textWrap: "pretty",
    zIndex: 1,
  },
  narrowDown: {
    fontSize: "34px",
  },
  tabletDown: {
    fontSize: "clamp(2.75rem, 7vw, 3.375rem)",
  },
  textWrap: "balance",
});

const heroStageClassName = css({
  display: "contents",
  gridArea: "stage",
  mobileDown: {
    blockSize: "370px",
    marginBlockStart: 0,
  },
  narrowDown: {
    blockSize: "460px",
  },
  tabletDown: {
    blockSize: "430px",
    display: "grid",
    gridTemplateAreas: '"content"',
    gridTemplateColumns: "minmax(0, 1fr)",
    gridTemplateRows: "minmax(0, 1fr)",
    inlineSize: "full",
    marginBlockStart: 6,
    position: "relative",
  },
});

const heroFigureClassName = css({
  aspectRatio: "1200 / 392",
  gridArea: "visual",
  inlineSize: "full",
  marginBlock: 0,
  marginInline: "auto",
  // Wide content: fill the siteContainer shell (`8xl`), not a one-step-under `7xl`.
  maxInlineSize: "8xl",
  position: "relative",
  tabletDown: {
    aspectRatio: "auto",
    blockSize: "full",
    gridArea: "content",
    inlineSize: "full",
  },
});

const heroImageClassName = css({
  blockSize: "full",
  display: "block",
  inlineSize: "full",
  inset: 0,
  maskImage: "url(/masks/desktop.svg)",
  maskMode: "alpha",
  maskRepeat: "no-repeat",
  maskSize: "100% 100%",
  mobileDown: {
    maskImage: "url(/masks/mobile.svg)",
  },
  objectFit: "cover",
  position: "absolute",
  tabletDown: {
    maskImage: "url(/masks/tablet.svg)",
  },
});

const heroCopyClassName = css({
  gridArea: "copy",
  mobileDown: {
    alignSelf: "start",
    backgroundColor: "bg.surface",
    display: "block",
    gridArea: "content",
    inlineSize: "56%",
    marginBlockStart: "150px",
    maxInlineSize: "13.375rem",
    paddingInlineEnd: 2,
    zIndex: 1,
  },
  narrowDown: {
    inlineSize: "61%",
    maxInlineSize: "13.75rem",
  },
  tabletDown: {
    display: "contents",
  },
});

const descriptionClassName = css({
  color: "text.secondary",
  fontSize: "lg",
  lineHeight: "1.55",
  marginBlockEnd: 5.5,
  mobileDown: {
    alignSelf: "auto",
    backgroundColor: "transparent",
    fontSize: "15px",
    inlineSize: "auto",
    justifySelf: "auto",
    lineHeight: "1.42",
    marginBlockEnd: 3.5,
    maxInlineSize: "none",
    padding: 0,
    zIndex: 1,
  },
  tabletDown: {
    alignSelf: "end",
    backgroundColor: "bg.surface",
    fontSize: "md",
    gridArea: "content",
    inlineSize: "44%",
    justifySelf: "start",
    lineHeight: "1.48",
    marginBlockEnd: "26px",
    marginInlineStart: "4%",
    maxInlineSize: "22rem",
    paddingBlockEnd: 2.5,
    paddingBlockStart: 3,
    paddingInlineEnd: 4.5,
    zIndex: 2,
  },
});

const ctaClassName = cx(
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
    "& > svg": {
      color: "brand",
    },
    alignItems: "center",
    backgroundColor: "color-mix(in oklab, token(colors.brand) 12%, white)",
    borderColor: "brand",
    borderWidth: "2px",
    color: "text.primary",
    display: "inline-flex",
    fontSize: "sm",
    fontWeight: "bold",
    gap: 3,
    inlineSize: "fit-content",
    justifyContent: "center",
    minBlockSize: "52px",
    mobileDown: {
      alignSelf: "auto",
      fontSize: "13px",
      gap: 2.5,
      justifySelf: "auto",
      margin: 0,
      minBlockSize: "47px",
      paddingInline: "15px",
      whiteSpace: "nowrap",
      zIndex: 1,
    },
    paddingBlock: 0,
    paddingInline: 6,
    tabletDown: {
      alignSelf: "start",
      gridArea: "content",
      justifySelf: "end",
      marginBlockStart: "7.75rem",
      marginInlineEnd: "4%",
      zIndex: 2,
    },
    textDecoration: "none",
    transitionDuration: "fast",
    transitionProperty: "colors,translate",
    transitionTimingFunction: "outDramatic",
  }),
);

const aboutTeaserClassName = grid({
  alignItems: "center",
  borderBlockStartColor: "border.subtle",
  borderBlockStartWidth: "1px",
  columnGap: 6,
  gridTemplateAreas: '"heading copy link"',
  gridTemplateColumns:
    "minmax(token(sizes.48), 0.8fr) minmax(0, 1.5fr) max-content",
  marginBlockStart: "clamp(2rem, 4vw, 3rem)",
  mobileDown: {
    columnGap: 0,
    gridTemplateAreas: '"heading" "copy" "link"',
    gridTemplateColumns: "minmax(0, 1fr)",
    marginBlockStart: 6,
    paddingBlockStart: 4,
    rowGap: 3,
  },
  paddingBlockStart: 4,
  tabletDown: {
    gridTemplateAreas: '"heading copy" "heading link"',
    gridTemplateColumns: "minmax(token(sizes.48), 0.8fr) minmax(0, 1.5fr)",
    rowGap: 0,
  },
});

const aboutTeaserHeadingClassName = css({
  fontFamily: "var(--font-montserrat)",
  fontSize: "2xl",
  fontWeight: "semibold",
  gridArea: "heading",
  lineHeight: "1.2",
  margin: 0,
  maxInlineSize: "72",
});

const aboutTeaserCopyClassName = css({
  color: "text.secondary",
  fontSize: "md",
  gridArea: "copy",
  lineHeight: "1.6",
  margin: 0,
  maxInlineSize: "3xl",
});

const aboutTeaserLinkClassName = cx(
  "group",
  css({
    _focusVisible: {
      outline: "3px solid token(colors.brand.ring)",
      outlineOffset: 1,
    },
    _hover: {
      color: "brand",
    },
    alignItems: "center",
    color: "text.primary",
    display: "inline-flex",
    fontSize: "sm",
    fontWeight: "semibold",
    gap: 2,
    gridArea: "link",
    inlineSize: "fit-content",
    minBlockSize: 11,
    textDecoration: "underline",
    textDecorationColor: "brand",
    textUnderlineOffset: "4px",
    whiteSpace: "nowrap",
  }),
);

const HERO_IMAGE_ALT =
  "A collage of 3D-printed architecture, gears, figures, and lattice structures.";

const Home = () => (
  <div className={pageSpacingClassName}>
    <MarketingHeroImagePreload />
    <section aria-labelledby="home-title" className={heroClassName}>
      <div className={headingGroupClassName}>
        <p className={eyebrowClassName}>
          Your go-to platform for 3D printing files
        </p>
        {/* Shared with `/about` — name must stay unique on the document. */}
        <ViewTransition name={MARKETING_HERO_TITLE_TRANSITION}>
          <h1 className={headingClassName} id="home-title">
            Discover what's possible with 3D Printing
          </h1>
        </ViewTransition>
      </div>
      <div className={heroStageClassName}>
        {/* Shared with `/about` — keep in sync with `marketing-view-transitions.ts`. */}
        <ViewTransition name={MARKETING_HERO_IMAGE_TRANSITION}>
          <MarketingHeroImage
            alt={HERO_IMAGE_ALT}
            figureClassName={heroFigureClassName}
            imageClassName={heroImageClassName}
          />
        </ViewTransition>
        <div className={heroCopyClassName}>
          <p className={descriptionClassName}>
            Join our community of creators and explore a vast library of
            user-submitted models.
          </p>
          <Link className={ctaClassName} href="/3d-models" prefetch>
            <span>Browse Models</span>
            <FaArrowRight
              aria-hidden="true"
              className={arrowRecipe({
                direction: "right",
                distance: "default",
                size: "md",
              })}
            />
          </Link>
        </div>
      </div>
    </section>
    <section
      aria-labelledby="about-teaser-title"
      className={aboutTeaserClassName}
    >
      <h2 className={aboutTeaserHeadingClassName} id="about-teaser-title">
        A place for ideas to take shape.
      </h2>
      <p className={aboutTeaserCopyClassName}>
        Founded in 2023, PrintForge is a home for people who design, share, and
        discover 3D-printable models—from practical tools to artistic creations.
      </p>
      <Link className={aboutTeaserLinkClassName} href="/about" prefetch>
        <span>Read the PrintForge story</span>
        <FaArrowRight
          aria-hidden="true"
          className={arrowRecipe({
            direction: "right",
            distance: "compact",
            size: "sm",
          })}
        />
      </Link>
    </section>
  </div>
);

export default Home;
