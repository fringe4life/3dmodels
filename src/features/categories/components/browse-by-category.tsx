import { css, cx } from "@styled-system/css";
import type { Route } from "next";
import Link from "next/link";
import { type ReactNode, Suspense } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { sectionHeadingClassName } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { getCategoriesWithCounts } from "@/features/categories/queries/get-categories-with-counts";
import {
  bandClassName,
  beltClassName,
  captionLineClassName,
  captionTrackClassName,
  captionWindowClassName,
  controlsClassName,
  duplicateClassName,
  edgeBlurClassName,
  edgeBlurEndClassName,
  edgeBlurStartClassName,
  gateClassName,
  gateMotion,
  gatePlateDelay,
  gateRuleClassName,
  gateRuleEndClassName,
  gateRuleStartClassName,
  gateTickClassName,
  headerClassName,
  pauseControlClassName,
  pauseGlyphClassName,
  pauseInputClassName,
  pauseStatePauseClassName,
  pauseStatePlayClassName,
  plateClassName,
  plateCountClassName,
  railFadeClassName,
  railFadeEndClassName,
  railFadeLayerClassName,
  railFadeStartClassName,
  sectionClassName,
  vignetteClassName,
  windowClassName,
} from "./browse-by-category.styles";

const PAUSE_INPUT_ID = "pause-categories";
const ALL_MODELS_HREF = "/3d-models" satisfies Route;

interface Plate {
  count: number;
  href: Route;
  label: string;
  slug: string;
}

const plateBody = (plate: Plate) => (
  <>
    <span>{plate.label}</span>
    <span className={plateCountClassName}>{plate.count} models</span>
  </>
);

const CategoryPlate = ({
  duplicate,
  index,
  plate,
  plateCount,
}: {
  duplicate: boolean;
  index: number;
  plate: Plate;
  plateCount: number;
}) => {
  const delay = { animationDelay: gatePlateDelay(index, plateCount) };

  // Loop copies are paint-only: never links, never focusable. Pointer hits the
  // real list when a plate is in the aperture; ARIA never sees the copies.
  if (duplicate) {
    return (
      <span
        aria-hidden="true"
        className={plateClassName}
        data-gate-run=""
        style={delay}
      >
        {plateBody(plate)}
      </span>
    );
  }

  return (
    <Link
      className={plateClassName}
      data-gate-run=""
      href={plate.href}
      prefetch
      style={delay}
    >
      {plateBody(plate)}
    </Link>
  );
};

/**
 * The real list plus a copy either side of it, so the belt never runs out of
 * plates at the loop seam. Copies are noninteractive spans; only the middle
 * list contributes ten announced, operable links.
 */
const BeltCopy = ({
  duplicate = false,
  plates,
}: {
  duplicate?: boolean;
  plates: Plate[];
}) => {
  const items = plates.map((plate, index) => (
    <CategoryPlate
      duplicate={duplicate}
      index={index}
      key={`${duplicate ? "copy" : "list"}-${plate.slug}`}
      plate={plate}
      plateCount={plates.length}
    />
  ));

  if (!duplicate) {
    return <>{items}</>;
  }

  return (
    <div
      aria-hidden="true"
      className={duplicateClassName}
      data-category-duplicate=""
    >
      {items}
    </div>
  );
};

const CategoryHeader = () => (
  <div className={headerClassName}>
    <h2 className={sectionHeadingClassName} id="browse-categories-heading">
      Browse by category
    </h2>
    <div className={controlsClassName}>
      <input
        className={pauseInputClassName}
        id={PAUSE_INPUT_ID}
        type="checkbox"
      />
      <label
        className={pauseControlClassName}
        data-pause-control=""
        htmlFor={PAUSE_INPUT_ID}
      >
        <span className={pauseStatePauseClassName} data-pause="pause">
          <FaPause aria-hidden="true" className={pauseGlyphClassName} />
          Pause
        </span>
        <span className={pauseStatePlayClassName} data-pause="play">
          <FaPlay aria-hidden="true" className={pauseGlyphClassName} />
          Play
        </span>
      </label>
      <SectionLink href={ALL_MODELS_HREF}>All categories</SectionLink>
    </div>
  </div>
);

/** Same footprint as the live band so Suspense swap does not shift the page. */
const BrowseByCategorySkeleton = () => (
  <section
    aria-busy="true"
    aria-labelledby="browse-categories-heading"
    className={sectionClassName}
  >
    <CategoryHeader />
    <div className={bandClassName}>
      <div
        className={cx(
          windowClassName,
          css({ backgroundColor: "bg.muted", opacity: 0.45 }),
        )}
      />
    </div>
  </section>
);

const CategoryBand = ({ plates }: { plates: Plate[] }) => {
  const [firstPlate] = plates;
  // One extra line so the track wraps cleanly; its key is distinct, not an index.
  const captionLines = firstPlate
    ? [...plates, { ...firstPlate, slug: `${firstPlate.slug}-loop` }]
    : plates;

  return (
    <div className={bandClassName}>
      <div className={windowClassName} data-category-window="">
        <div className={vignetteClassName} />
        <div className={beltClassName} data-category-belt="" data-gate-run="">
          {/* Belt and both shoulders: a copy before and after the real list, so
              the row is filled on both sides at every phase of the loop. */}
          <BeltCopy duplicate plates={plates} />
          <BeltCopy plates={plates} />
          <BeltCopy duplicate plates={plates} />
          {/* Edge fades: each one reads the scroller's own state, so it appears
              only while there is still more of the row in that direction. */}
          <div aria-hidden="true" className={railFadeLayerClassName}>
            <span className={cx(railFadeClassName, railFadeStartClassName)} />
            <span className={cx(railFadeClassName, railFadeEndClassName)} />
          </div>
        </div>
        <div className={cx(edgeBlurClassName, edgeBlurStartClassName)} />
        <div className={cx(edgeBlurClassName, edgeBlurEndClassName)} />
      </div>

      <div aria-hidden="true" className={gateClassName}>
        <span className={cx(gateRuleClassName, gateRuleStartClassName)} />
        <span className={cx(gateRuleClassName, gateRuleEndClassName)} />
        <span
          className={gateTickClassName}
          style={{ insetBlockStart: 0, insetInlineStart: 0 }}
        />
        <span
          className={gateTickClassName}
          style={{ insetBlockStart: 0, insetInlineEnd: 0 }}
        />
        <span
          className={gateTickClassName}
          style={{ insetBlockEnd: 0, insetInlineStart: 0 }}
        />
        <span
          className={gateTickClassName}
          style={{ insetBlockEnd: 0, insetInlineEnd: 0 }}
        />
      </div>

      <div aria-hidden="true" className={captionWindowClassName}>
        <div className={captionTrackClassName} data-gate-run="">
          {captionLines.map((plate) => (
            <div className={captionLineClassName} key={`caption-${plate.slug}`}>
              {plate.label} · {plate.count} models
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Loads the cached category row. Failures stay local: the home hero and other
 * sections keep rendering when this optional band cannot load.
 */
const BrowseByCategoryContent = async () => {
  let categories: Awaited<ReturnType<typeof getCategoriesWithCounts>>;
  try {
    categories = await getCategoriesWithCounts();
  } catch {
    return null;
  }

  if (categories.length === 0) {
    return null;
  }

  const plates: Plate[] = categories.map((category) => ({
    count: category.modelCount,
    href: `/3d-models/categories/${category.slug}`,
    label: category.name,
    slug: category.slug,
  }));

  return (
    <section
      aria-labelledby="browse-categories-heading"
      className={sectionClassName}
      style={gateMotion(plates.length)}
    >
      <CategoryHeader />
      <CategoryBand plates={plates} />
    </section>
  );
};

/**
 * Home page category band — an aperture at the centre of the row with the
 * catalogue drifting through it.
 *
 * Pausing is CSS-only: the checkbox below is the state, and `:has()` in
 * `sectionClassName` carries it up to the belt, the plates and the caption. Hover
 * and keyboard focus pause without any state at all, which is why this stays a
 * server component. On touch there is no hover to pause with, so the belt does not
 * move at all and the emphasis follows the user's own horizontal scroll.
 *
 * Under `prefers-reduced-motion` none of that exists: no belt, no gate, no
 * caption, and no pause control — the row is a plain snapped scroll rail of the
 * same ten plates, which is why the rail is the base state in the styles.
 *
 * The data work sits behind Suspense so a cold cache miss does not block the
 * hero; a rejected read collapses this row instead of the whole home page.
 */
export const BrowseByCategory = (): ReactNode => (
  <Suspense fallback={<BrowseByCategorySkeleton />}>
    <BrowseByCategoryContent />
  </Suspense>
);
