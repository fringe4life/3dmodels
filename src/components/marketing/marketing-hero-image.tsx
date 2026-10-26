import { css, cx } from "@styled-system/css";
import Image from "next/image";
import {
  HERO_IMAGE_DESKTOP_SIZES,
  HERO_IMAGE_DESKTOP_SRC,
  HERO_IMAGE_MOBILE_MEDIA,
  HERO_IMAGE_MOBILE_SIZES,
  HERO_IMAGE_MOBILE_SRC,
  HERO_IMAGE_TABLET_SIZES,
  HERO_IMAGE_TABLET_SRC,
} from "@/lib/hero-image";

const heroImageMobileOnlyClassName = css({
  "@media (width >= 35rem)": { display: "none" },
  display: "block",
});

const heroImageTabletOnlyClassName = css({
  "@media (width >= 35rem) and (width < 62.5rem)": { display: "block" },
  display: "none",
});

const heroImageDesktopOnlyClassName = css({
  "@media (width >= 62.5rem)": { display: "block" },
  display: "none",
});

/** Hoist before the hero `ViewTransition` wrapper on marketing routes. */
export const MarketingHeroImagePreload = () => (
  <link
    as="image"
    fetchPriority="high"
    href={HERO_IMAGE_MOBILE_SRC}
    media={HERO_IMAGE_MOBILE_MEDIA}
    rel="preload"
  />
);

interface MarketingHeroImageProps {
  alt: string;
  figureClassName: string;
  imageClassName: string;
}

/**
 * Art-directed hero collage (mobile / tablet / desktop AVIFs). Stacked
 * `Image` layers replace `<picture>` while keeping the same masks on
 * `imageClassName`. Preload: `MarketingHeroImagePreload` + desktop
 * `Image preload`.
 */
export const MarketingHeroImage = ({
  alt,
  figureClassName,
  imageClassName,
}: MarketingHeroImageProps) => (
  <figure className={figureClassName}>
    <Image
      alt={alt}
      className={cx(imageClassName, heroImageMobileOnlyClassName)}
      fill
      sizes={HERO_IMAGE_MOBILE_SIZES}
      src={HERO_IMAGE_MOBILE_SRC}
    />
    <Image
      alt={alt}
      className={cx(imageClassName, heroImageTabletOnlyClassName)}
      fill
      sizes={HERO_IMAGE_TABLET_SIZES}
      src={HERO_IMAGE_TABLET_SRC}
    />
    <Image
      alt={alt}
      className={cx(imageClassName, heroImageDesktopOnlyClassName)}
      fill
      preload
      sizes={HERO_IMAGE_DESKTOP_SIZES}
      src={HERO_IMAGE_DESKTOP_SRC}
    />
  </figure>
);
