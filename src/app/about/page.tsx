import { visuallyHidden } from "@styled-system/patterns";
import type { Metadata } from "next";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";
import {
  HERO_IMAGE_DESKTOP_HEIGHT,
  HERO_IMAGE_DESKTOP_SIZES,
  HERO_IMAGE_DESKTOP_SRC,
  HERO_IMAGE_DESKTOP_WIDTH,
  HERO_IMAGE_MOBILE_MEDIA,
  HERO_IMAGE_MOBILE_SIZES,
  HERO_IMAGE_MOBILE_SRC,
  HERO_IMAGE_TABLET_MEDIA,
  HERO_IMAGE_TABLET_SIZES,
  HERO_IMAGE_TABLET_SRC,
} from "@/lib/hero-image";
import {
  MARKETING_HERO_IMAGE_TRANSITION,
  MARKETING_HERO_TITLE_TRANSITION,
} from "@/lib/marketing-view-transitions";
import {
  bandFigureClassName,
  bandImageClassName,
  ctaClassName,
  eyebrowClassName,
  headingClassName,
  headingGroupClassName,
  heroLayoutClassName,
  heroSectionClassName,
  pageClassName,
  pillarFirstClassName,
  pillarSecondClassName,
  pillarsLayoutClassName,
  pillarsSectionClassName,
  pillarThirdClassName,
  pillarThirdRowClassName,
  storyClassName,
  visionBodyClassName,
  visionHeadingClassName,
  visionLayoutClassName,
  visionSectionClassName,
} from "./about.styles";

// Marketing: static shell + Link prefetch={true}. Session deferred via
// getUser() → navigation() so this route stays statically prerenderable.
export const ensureStatic = "prefetch";

export const metadata: Metadata = {
  description:
    "Learn about PrintForge - the go-to platform for 3D printing enthusiasts, makers, and professional designers. Discover our mission to empower makers worldwide.",
  openGraph: {
    description:
      "Founded in 2023, PrintForge has quickly become the go-to platform for 3D printing enthusiasts to share and discover amazing STL files.",
    title: "About PrintForge - Empowering Makers Worldwide",
  },
  title: "About",
};

const FOUNDING_STORY =
  "Founded in 2023, PrintForge has quickly become the go-to platform for 3D printing enthusiasts, makers, and professional designers to share and discover amazing STL files for 3D printing.";

const MISSION =
  "Our mission is to foster a vibrant community where creativity meets technology, enabling anyone to bring their ideas to life through 3D printing.";

const VISION_PLATFORM =
  "At PrintForge, we believe that 3D printing is revolutionizing the way we create, prototype, and manufacture. Our platform serves as a bridge between designers and makers, enabling the sharing of knowledge and creativity that pushes the boundaries of what's possible with 3D printing.";

const VISION_MAKERS =
  "Whether you're a hobbyist looking for your next weekend project, an educator seeking teaching materials, or a professional designer wanting to share your creations, PrintForge provides the tools and community to support your journey in 3D printing.";

const ABOUT_IMAGE_ALT =
  "A collage of 3D-printed architecture, gears, figures, and lattice structures.";

const heroImageCommon = {
  alt: ABOUT_IMAGE_ALT,
  className: bandImageClassName,
  fill: true,
} as const;

const {
  props: { sizes: bandMobileSizes, srcSet: bandMobileSrcSet },
} = getImageProps({
  ...heroImageCommon,
  sizes: HERO_IMAGE_MOBILE_SIZES,
  src: HERO_IMAGE_MOBILE_SRC,
});

const {
  props: { sizes: bandTabletSizes, srcSet: bandTabletSrcSet },
} = getImageProps({
  ...heroImageCommon,
  sizes: HERO_IMAGE_TABLET_SIZES,
  src: HERO_IMAGE_TABLET_SRC,
});

const { props: bandDesktopProps } = getImageProps({
  ...heroImageCommon,
  preload: true,
  sizes: HERO_IMAGE_DESKTOP_SIZES,
  src: HERO_IMAGE_DESKTOP_SRC,
});

const AboutPage = () => (
  <div className={pageClassName}>
    <section aria-labelledby="about-title" className={heroSectionClassName}>
      <div className={heroLayoutClassName}>
        <div className={headingGroupClassName}>
          <p className={eyebrowClassName}>About PrintForge</p>
          <ViewTransition name={MARKETING_HERO_TITLE_TRANSITION}>
            <h1 className={headingClassName} id="about-title">
              <span>Empowering</span> <span>Makers</span> <span>Worldwide</span>
            </h1>
          </ViewTransition>
        </div>
        <div className={storyClassName}>
          <p>{FOUNDING_STORY}</p>
          <p>{MISSION}</p>
        </div>
        <ViewTransition name={MARKETING_HERO_IMAGE_TRANSITION}>
          <figure className={bandFigureClassName}>
            <picture>
              <source
                media={HERO_IMAGE_MOBILE_MEDIA}
                sizes={bandMobileSizes}
                srcSet={bandMobileSrcSet}
              />
              <source
                media={HERO_IMAGE_TABLET_MEDIA}
                sizes={bandTabletSizes}
                srcSet={bandTabletSrcSet}
              />
              <img
                {...bandDesktopProps}
                alt={ABOUT_IMAGE_ALT}
                height={HERO_IMAGE_DESKTOP_HEIGHT}
                width={HERO_IMAGE_DESKTOP_WIDTH}
              />
            </picture>
          </figure>
        </ViewTransition>
      </div>
    </section>

    <section
      aria-labelledby="about-pillars-title"
      className={pillarsSectionClassName}
    >
      <h2 className={visuallyHidden()} id="about-pillars-title">
        What PrintForge offers
      </h2>
      <div className={pillarsLayoutClassName}>
        <div className={pillarFirstClassName}>
          <span aria-hidden="true" />
          <h3>100K+ Models</h3>
          <p>
            Access our vast library of community-created 3D models, from
            practical tools to artistic creations.
          </p>
        </div>
        <div className={pillarSecondClassName}>
          <span aria-hidden="true" />
          <h3>Active Community</h3>
          <p>
            Join thousands of makers who share tips, provide feedback, and
            collaborate on projects.
          </p>
        </div>
        <div className={pillarThirdClassName}>
          <span aria-hidden="true" />
          <div className={pillarThirdRowClassName}>
            <h3>Free to Use</h3>
            <p>
              Most models are free to download, with optional premium features
              for power users.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      aria-labelledby="about-vision-title"
      className={visionSectionClassName}
    >
      <div className={visionLayoutClassName}>
        <h2 className={visionHeadingClassName} id="about-vision-title">
          Our Vision
        </h2>
        <div className={visionBodyClassName}>
          <p>{VISION_PLATFORM}</p>
          <p>{VISION_MAKERS}</p>
          <Link className={ctaClassName} href="/3d-models" prefetch>
            <span>Browse Models</span>
            <FaArrowRight
              aria-hidden="true"
              className={arrowRecipe({ direction: "right", size: "md" })}
            />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
