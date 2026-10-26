/** Square hero — about page + Open Graph (`public/hero-image-square.avif`). */
export const HERO_IMAGE_SQUARE_SRC = "/hero-image-square.avif" as const;
export const HERO_IMAGE_SQUARE_WIDTH = 724;
export const HERO_IMAGE_SQUARE_HEIGHT = 724;

/** Home hero art-direction set (matches `mobile` / `tablet` Panda breakpoints). */
export const HERO_IMAGE_MOBILE_SRC = "/hero-mobile.avif" as const;
export const HERO_IMAGE_TABLET_SRC = "/hero-tablet.avif" as const;
export const HERO_IMAGE_DESKTOP_SRC = "/hero-desktop.avif" as const;

/** Mobile preload `media` — aligns with `mobileDown` (`width < 35rem`). */
export const HERO_IMAGE_MOBILE_MEDIA = "(width < 35rem)" as const;

export const HERO_IMAGE_MOBILE_SIZES = "calc(100vw - 2rem)" as const;
export const HERO_IMAGE_TABLET_SIZES = "calc(100vw - 3rem)" as const;
/** Shell `8xl` (90rem) minus lg gutters (4rem) → content width; cap used desktop hint. */
export const HERO_IMAGE_DESKTOP_SIZES =
  "(max-width: 90rem) calc(100vw - 4rem), 1344px" as const;
