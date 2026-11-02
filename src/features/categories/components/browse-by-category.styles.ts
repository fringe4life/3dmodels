import { css, cx, keyframes } from "@styled-system/css";
import type { CSSProperties } from "react";

/**
 * Home page category band.
 *
 * Ten plates on a 176px pitch (168px plate + 8px gap), which is what makes the
 * loop exact: one copy of the belt is 1760px, ten plates travel it in 84s, so a
 * plate crosses the gate every 8.4s and its peak can be phased from its index.
 * The numbers live here because the keyframe distances, the plate width and every
 * plate's `animation-delay` have to agree — change one, change all three.
 *
 * Three states, in order of how little the reader asked for:
 * 1. Reduced motion → a plain snapped rail. No belt, no gate, no caption, no
 *    pause control: the base styles are already the still state, and `_finePointerMotion`
 *    is what adds the aperture, so nothing has to be undone for it.
 * 2. Touch → same rail, with the emphasis driven by the reader's own scroll
 *    (`view(inline)`), so plates light up as they pass the middle.
 * 3. Precise pointer, motion allowed → the belt drifts through the gate on the
 *    clock, pausable by hover, focus or the checkbox.
 */
const GATE_PITCH_PX = 176;
const GATE_PLATE_PX = 168;
const GATE_GAP_PX = 8;
const GATE_SECONDS_PER_PLATE = 8.4;
const GATE_CAPTION_LINE_PX = 24;
const GATE_HEIGHT_PX = 88;

/**
 * Row-local animations. These belong to this band, not to the design system, so
 * they are declared with `keyframes()` here and compile to names scoped to this
 * file instead of living in `theme/keyframes.ts`.
 */
const gateDrift = keyframes({
  from: { translate: "var(--gate-from)" },
  to: { translate: "var(--gate-to)" },
});

/**
 * Plate emphasis: pale and slightly smaller on approach, inverted to near black
 * while it is inside the gate, then pale again. The hold is exactly one plate
 * wide — pale for its neighbours, which sit a whole pitch away.
 */
const gateFocus = keyframes({
  "0%, 43%": {
    backgroundColor: "#f9fafb",
    boxShadow: "inset 0 0 0 1px #e5e7eb",
    color: "#6b7280",
    opacity: 0.72,
    scale: 0.9,
  },
  "45%, 55%": {
    backgroundColor: "#111827",
    boxShadow: "inset 0 0 0 1px #111827, 0 16px 30px -24px rgb(17 24 39 / 0.9)",
    color: "#ffffff",
    opacity: 1,
    scale: 1,
  },
  "57%, 100%": {
    backgroundColor: "#f9fafb",
    boxShadow: "inset 0 0 0 1px #e5e7eb",
    color: "#6b7280",
    opacity: 0.72,
    scale: 0.9,
  },
});

/** Caption reads the plate currently in the gate; one line per plate. */
const gateCaption = keyframes({
  from: { translate: "0 0" },
  to: { translate: "0 calc(-1 * var(--gate-caption-copy))" },
});

/**
 * Belt placement, derived from the plate count so a longer category list needs no
 * new CSS. `from` puts the first plate dead centre with one full copy behind it;
 * `to` moves exactly one copy further left, which is the loop seam.
 */
export const gateMotion = (plateCount: number) => {
  const copy = plateCount * GATE_PITCH_PX;
  const from = -(copy + GATE_PLATE_PX / 2);
  return {
    "--gate-caption-copy": `${plateCount * GATE_CAPTION_LINE_PX}px`,
    "--gate-duration": `${plateCount * GATE_SECONDS_PER_PLATE}s`,
    "--gate-from": `${from}px`,
    // One caption step per plate, so the line swaps whole rather than sliding.
    "--gate-steps": `${plateCount}`,
    "--gate-to": `${from - copy}px`,
  } as unknown as CSSProperties;
};

/**
 * Phase each plate so its peak lands when it reaches the gate: plate 0 starts
 * half a loop ahead (already in the gate), plate n a further step behind.
 */
export const gatePlateDelay = (index: number, plateCount: number) =>
  `${index * GATE_SECONDS_PER_PLATE - (plateCount * GATE_SECONDS_PER_PLATE) / 2}s`;

/**
 * Pause is CSS-only. The checkbox in the header is the state; `:has()` lifts it
 * to the section so the belt and both plate tracks stop together. Hover and
 * keyboard focus need no state at all.
 *
 * The reduced-motion rule is the belt-and-braces line: the belt, the plates and
 * the caption track all carry `data-gate-run`, so one descendant selector
 * (specificity 0,2,0) stops every one of them no matter which condition emitted
 * their animation — a plain media block could only tie with the atomic class and
 * would depend on stylesheet order. Pause control and checkbox are absent unless
 * `_finePointerMotion` matches, so reduce never sees a dead Pause button.
 */
export const sectionClassName = css({
  "@media (prefers-reduced-motion: reduce)": {
    "& [data-gate-run]": { animationName: "none" },
  },
  "& [data-pause='play']": { display: "none" },
  "&:has(#pause-categories:checked) [data-gate-run]": {
    animationPlayState: "paused",
  },
  "&:has(#pause-categories:checked) [data-pause='pause']": { display: "none" },
  "&:has(#pause-categories:checked) [data-pause='play']": {
    display: "inline-flex",
  },
  "&:has(#pause-categories:focus-visible) [data-pause-control]": {
    outline: "3px solid token(colors.brand.ring)",
    outlineOffset: 2,
  },
  marginBlockStart: { base: 7, md: "2.75rem" },
  // Room below the caption so its descenders are not flush with the page edge.
  paddingBlockEnd: { base: 2, md: 3 },
});

export const headerClassName = css({
  alignItems: "center",
  borderBlockStartColor: "border.subtle",
  borderBlockStartWidth: 1,
  columnGap: 6,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingBlockStart: 6,
  rowGap: 3,
});

export const controlsClassName = css({
  alignItems: "center",
  columnGap: 4,
  display: "flex",
});

/**
 * Pause exists only where the belt runs (`finePointerMotion`). Base is `none`,
 * so hover-capable coarse pointers and reduced motion never get a dead control.
 */
export const pauseControlClassName = css({
  _finePointerMotion: { display: "inline-flex" },
  _hover: { backgroundColor: "bg.muted" },
  alignItems: "center",
  backgroundColor: "bg.subtle",
  blockSize: 8,
  borderColor: "border.DEFAULT",
  borderRadius: "2px",
  borderWidth: 1,
  columnGap: 2,
  cursor: "pointer",
  display: "none",
  fontFamily: "mono",
  fontSize: "11px",
  fontVariantNumeric: "tabular-nums",
  paddingInline: 2.5,
  userSelect: "none",
});

/**
 * Checkbox stays out of the tab order unless the belt can run. Under
 * `finePointerMotion` it is visually hidden but still the `:has()` state bit.
 */
export const pauseInputClassName = css({
  _finePointerMotion: {
    borderWidth: 0,
    clip: "rect(0, 0, 0, 0)",
    display: "block",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
  display: "none",
});

export const bandClassName = css({
  // Keyboard into a real plate: drop the aperture clip, park the belt as a
  // static flex row, and hide the loop copies so focus is never clipped off-screen.
  _finePointerMotion: {
    "&:focus-within [data-category-belt]": {
      animationName: "none",
      insetInlineStart: "auto",
      position: "relative",
      translate: "none",
    },
    "&:focus-within [data-category-duplicate]": { display: "none" },
    "&:focus-within [data-category-window]": {
      overflowX: "auto",
      scrollSnapType: "x mandatory",
    },
  },
  // Pointing at the row or tabbing into it stops the belt on the plate you are
  // looking at — no state, no script.
  "&:focus-within [data-gate-run], &:hover [data-gate-run]": {
    animationPlayState: "paused",
  },
  marginBlockStart: 6,
  position: "relative",
});

/**
 * The window is a horizontal rail by default — that is the reduced-motion state,
 * and it is also what touch gets. Only a precise pointer with motion allowed
 * turns it into the clipped aperture the belt travels behind.
 * `containerType: scroll-state` is what lets the edge fades below ask whether the
 * rail can still be scrolled each way. It applies no size containment, so it does
 * not disturb the belt's absolute placement.
 */
export const windowClassName = css({
  _finePointerMotion: { overflowX: "hidden", scrollSnapType: "none" },
  "&::-webkit-scrollbar": { display: "none" },
  blockSize: `${GATE_HEIGHT_PX}px`,
  containerType: "scroll-state",
  overflowX: "auto",
  overflowY: "hidden",
  overscrollBehaviorInline: "contain",
  position: "relative",
  scrollbarWidth: "none",
  scrollSnapType: "x mandatory",
});

/**
 * Elliptical window: the row curves out of frame instead of being cut.
 * `pointerEvents: none` matters — this sits over the plates and would otherwise
 * swallow every click on them.
 */
export const vignetteClassName = css({
  _finePointerMotion: { display: "block" },
  display: "none",
  inset: 0,
  maskImage: "radial-gradient(52% 145% at 50% 50%, #000 74%, transparent 100%)",
  pointerEvents: "none",
  position: "absolute",
});

/**
 * Two backdrop-filter panes soften whatever is passing underneath near each end,
 * so a plate defocuses before the vignette takes its coverage away. Filtering here
 * rather than per plate keeps this to two layers instead of twenty animations.
 */
export const edgeBlurClassName = css({
  _finePointerMotion: { display: "block" },
  backdropFilter: "blur(3px) saturate(0.92)",
  display: "none",
  inlineSize: "10%",
  insetBlock: 0,
  pointerEvents: "none",
  position: "absolute",
});

export const edgeBlurStartClassName = css({
  insetInlineStart: 0,
  maskImage: "linear-gradient(90deg, #000, transparent)",
});

export const edgeBlurEndClassName = css({
  insetInlineEnd: 0,
  maskImage: "linear-gradient(270deg, #000, transparent)",
});

/** Static flex row; the absolute placement and the drift exist only with motion. */
export const beltClassName = css({
  _finePointerMotion: {
    animationDuration: "var(--gate-duration)",
    animationIterationCount: "infinite",
    animationName: gateDrift,
    animationTimingFunction: "linear",
    blockSize: "full",
    insetBlockStart: 0,
    insetInlineStart: "50%",
    position: "absolute",
    translate: "var(--gate-from)",
  },
  alignItems: "center",
  columnGap: `${GATE_GAP_PX}px`,
  display: "flex",
  minInlineSize: "max-content",
  // Containing block for the rail's edge fades — the belt is as wide as one copy
  // of the list, which is the room a sticky fade needs to stay pinned. Overridden
  // by the belt's own absolute placement while the aperture runs.
  position: "relative",
});

/** The second copy exists only for the loop; it is never announced or focused. */
export const duplicateClassName = css({
  _finePointerMotion: { display: "flex" },
  columnGap: `${GATE_GAP_PX}px`,
  display: "none",
});

/**
 * Edge fades for the rail. Out of flow, so they neither join the flex row nor move
 * the 176px pitch, and wide enough (100% of the belt) to give their sticky
 * children room to pin — a sticky child of the scroller itself has none, because
 * its containing block is only the scrollport.
 */
export const railFadeLayerClassName = css({
  _scrollerRail: { display: "flex" },
  display: "none",
  inlineSize: "100%",
  insetBlock: 0,
  // The two fades must start at opposite ends of the layer: `inset-inline-*` on a
  // sticky box is a constraint, not a static position, so a stacked block layout
  // would leave the end fade at the left edge with nothing to pin back.
  justifyContent: "space-between",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 2,
});

/**
 * One fade. Its opacity is the scroll state itself: the start fade lives only
 * while the rail can still move towards the start, the end fade only while there
 * is more to the right. Reaching an end retires that side and the other takes
 * over, with no script and nothing to keep in sync.
 */
export const railFadeClassName = css({
  blockSize: "full",
  // Block, not inline: `position: sticky` and `block-size` are both ignored on a
  // non-replaced inline box, which leaves the fade at its natural position and
  // zero-sized.
  display: "block",
  inlineSize: { base: 10, md: 14 },
  opacity: 0,
  position: "sticky",
  transitionDuration: "fast",
  transitionProperty: "opacity",
  transitionTimingFunction: "outDramatic",
});

export const railFadeStartClassName = css({
  _scrollableStart: { opacity: 1 },
  backgroundImage:
    "linear-gradient(to right, token(colors.bg.surface) 45%, transparent)",
  insetInlineStart: 0,
});

export const railFadeEndClassName = css({
  _scrollableEnd: { opacity: 1 },
  backgroundImage:
    "linear-gradient(to left, token(colors.bg.surface) 45%, transparent)",
  insetInlineEnd: 0,
});

export const plateClassName = css({
  // Precise pointer: same keyframes, driven by the clock and phased per plate.
  _finePointerMotion: {
    animationDuration: "var(--gate-duration)",
    animationFillMode: "none",
    animationIterationCount: "infinite",
    animationName: gateFocus,
    animationRange: "normal",
    animationTimeline: "auto",
    animationTimingFunction: "linear",
  },
  _focusVisible: {
    outline: "3px solid token(colors.brand.ring)",
    outlineOffset: 1,
  },
  // Rail only (touch / reduced motion): scroll-timeline emphasis. Kept off the
  // fine-pointer path so `view(inline)` cannot fight the clock-driven gate.
  _scrollerRail: {
    _supportsScroll: {
      animationDuration: "auto",
      animationFillMode: "both",
      animationName: gateFocus,
      animationRange: "cover 30% cover 70%",
      animationTimeline: "view(inline)",
    },
  },
  alignItems: "center",
  backgroundColor: "bg.subtle",
  blockSize: `${GATE_HEIGHT_PX}px`,
  borderRadius: "2px",
  boxShadow: "inset 0 0 0 1px token(colors.border.subtle)",
  color: "text.muted",
  display: "flex",
  flex: "none",
  flexDirection: "column",
  fontFamily: "display",
  // 16px: one line for every label, including "Props & Cosplay".
  fontSize: "md",
  fontWeight: "semibold",
  inlineSize: `${GATE_PLATE_PX}px`,
  justifyContent: "center",
  lineHeight: 1.15,
  paddingInline: 4,
  rowGap: 0.5,
  scrollSnapAlign: "center",
  textAlign: "center",
  textDecoration: "none",
});

export const gateClassName = css({
  _finePointerMotion: { display: "block" },
  blockSize: `${GATE_HEIGHT_PX}px`,
  display: "none",
  inlineSize: `${GATE_PLATE_PX}px`,
  insetBlockStart: 0,
  insetInlineStart: "50%",
  pointerEvents: "none",
  position: "absolute",
  translate: "-50% 0",
});

export const gateRuleClassName = css({
  backgroundColor: "border.strong",
  blockSize: "1px",
  insetInline: 0,
  position: "absolute",
});

export const gateRuleStartClassName = css({ insetBlockStart: 0 });

export const gateRuleEndClassName = css({ insetBlockEnd: 0 });

export const gateTickClassName = css({
  backgroundColor: "border.strong",
  blockSize: 2,
  inlineSize: "1px",
  position: "absolute",
});

export const captionWindowClassName = css({
  _finePointerMotion: { display: "block" },
  blockSize: `${GATE_CAPTION_LINE_PX}px`,
  display: "none",
  inlineSize: "260px",
  marginBlockStart: 4,
  marginInline: "auto",
  overflow: "hidden",
  position: "relative",
  textAlign: "center",
});

export const captionTrackClassName = css({
  animationDuration: "var(--gate-duration)",
  animationIterationCount: "infinite",
  animationName: gateCaption,
  // Steps, not a slide: each plate's caption is shown whole for one plate's worth
  // of the loop, then swapped.
  animationTimingFunction: "steps(var(--gate-steps), end)",
});

export const captionLineClassName = css({
  blockSize: `${GATE_CAPTION_LINE_PX}px`,
  color: "text.secondary",
  fontFamily: "mono",
  fontSize: "12px",
  fontVariantNumeric: "tabular-nums",
  lineHeight: `${GATE_CAPTION_LINE_PX}px`,
});

export const pauseStatePauseClassName = css({
  alignItems: "center",
  columnGap: 2,
  display: "inline-flex",
});

/** Swapped by `:has()` in the section; hidden until the checkbox is checked. */
export const pauseStatePlayClassName = css({
  alignItems: "center",
  columnGap: 2,
  display: "none",
});

export const pauseGlyphClassName = cx(css({ fontSize: "9px" }));

/**
 * Without the gate caption the count has nowhere else to go, so it rides on the
 * plate — on touch, and in the reduced-motion rail where the caption is absent.
 */
export const plateCountClassName = css({
  _finePointerMotion: { display: "none" },
  color: "text.secondary",
  fontFamily: "mono",
  fontSize: "11px",
  fontVariantNumeric: "tabular-nums",
});
