import { cx } from "@styled-system/css";
import { visuallyHidden } from "@styled-system/patterns";
import type { Route } from "next";
import Link from "next/link";
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
}) => (
  <Link
    aria-hidden={duplicate || undefined}
    className={plateClassName}
    data-gate-run=""
    href={plate.href}
    prefetch
    style={{ animationDelay: gatePlateDelay(index, plateCount) }}
    tabIndex={duplicate ? -1 : undefined}
  >
    <span>{plate.label}</span>
    <span className={plateCountClassName}>{plate.count} models</span>
  </Link>
);

/**
 * The real list plus a copy either side of it, so the belt never runs out of
 * plates at the loop seam. The copies leave the accessibility tree and the tab
 * order, which keeps this ten announced links rather than thirty.
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

  // Announced once and focused once — the copies stay clickable (same href) but
  // leave the accessibility tree, so the row is ten links to a screen reader.
  return (
    <div aria-hidden="true" className={duplicateClassName}>
      {items}
    </div>
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
 */
export const BrowseByCategory = async () => {
  const categories = await getCategoriesWithCounts();

  if (categories.length === 0) {
    return null;
  }

  const plates: Plate[] = categories.map((category) => ({
    count: category.modelCount,
    href: `/3d-models/categories/${category.slug}`,
    label: category.name,
    slug: category.slug,
  }));

  const [firstPlate] = plates;
  // One extra line so the track wraps cleanly; its key is distinct, not an index.
  const captionLines = firstPlate
    ? [...plates, { ...firstPlate, slug: `${firstPlate.slug}-loop` }]
    : plates;

  return (
    <section
      aria-labelledby="browse-categories-heading"
      className={sectionClassName}
      style={gateMotion(plates.length)}
    >
      <div className={headerClassName}>
        <h2 className={sectionHeadingClassName} id="browse-categories-heading">
          Browse by category
        </h2>
        <div className={controlsClassName}>
          <input
            className={visuallyHidden()}
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

      <div className={bandClassName}>
        <div className={windowClassName}>
          <div className={vignetteClassName} />
          <div className={beltClassName} data-gate-run="">
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
              <div
                className={captionLineClassName}
                key={`caption-${plate.slug}`}
              >
                {plate.label} · {plate.count} models
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
