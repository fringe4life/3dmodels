import { css, cva } from "@styled-system/css";
import type { CssVarProperties } from "@styled-system/types";
import type { CSSProperties } from "react";
import { sanitiseName } from "@/utils/sanitise-name";

/**
 * Paint via `_icon` (`& :where(svg)`). FaHeart fill/stroke use `currentColor`,
 * so SVG needs its own `color` — button `color` alone not reliable vs ghost.
 *
 * Guest hearts omit liked/unliked hover color so guests get no can-like cue.
 */
export const heartButtonRecipe = cva({
  base: {
    _icon: {
      transitionDuration: "normal",
      transitionProperty: "color",
      transitionTimingFunction: {
        _supportsLinear: "ease-smooth-in-out",
        base: "ease-in-out",
      },
    },
    columnGap: 1,
    flexWrap: "wrap",
    position: "relative",
    transitionTimingFunction: {
      _supportsLinear: "ease-smooth-in-out",
    },
    zIndex: "5",
  },
  compoundVariants: [
    {
      css: {
        _hover: { _icon: { color: "like.hover" } },
        _icon: { color: "like" },
      },
      guest: false,
      visual: "liked",
    },
    {
      css: {
        _hover: { _icon: { color: "like.hover" } },
      },
      guest: false,
      visual: "unliked",
    },
    {
      css: {
        _icon: { color: "like" },
      },
      guest: true,
      visual: "liked",
    },
    {
      css: {
        _icon: { color: "text.placeholder" },
      },
      guest: true,
      visual: "unliked",
    },
  ],
  defaultVariants: {
    guest: false,
    visual: "unliked",
  },
  variants: {
    guest: {
      false: {},
      true: {},
    },
    visual: {
      liked: {},
      pending: {
        _icon: { color: "like.pending" },
        cursor: "progress",
      },
      unliked: {},
    },
  },
});

type HeartAnchorStyle = CSSProperties & CssVarProperties;

const heartAnchorStyle = (slug: string): HeartAnchorStyle => ({
  "--model-heart-anchor": `--model-heart-${sanitiseName(slug)}`,
});

const heartGuestRootClassName = css({
  display: "inline-flex",
});

/**
 * Guest link: unique CSS anchor + show the sibling hint on hover/focus.
 * `display: block !important` overrides UA `[popover]:not(:popover-open)`.
 * No `popovertarget` — click must follow `/signin`, not toggle a menu.
 *
 * Hint placement is CSS-only: `position-area: top`, then
 * `position-try-fallbacks` flip if that overflows. `position-visibility:
 * anchors-visible` strongly hides the hint when the heart is fully off-screen
 * (no JS `hidePopover`).
 */
const heartGuestHintTriggerClassName = css({
  "&:is(:hover, :focus-visible) + [popover]": {
    display: "block!",
  },
  anchorName: "var(--model-heart-anchor)",
});

const heartSignInHintClassName = css({
  backgroundColor: "bg.surface",
  borderColor: "border.subtle",
  borderWidth: 1,
  boxShadow: "md",
  color: "text.secondary",
  fontSize: "xs",
  fontWeight: "medium",
  margin: 0,
  marginBlock: 1,
  maxInlineSize: "16rem",
  paddingBlock: 1,
  paddingInline: 2,
  pointerEvents: "none",
  position: "fixed",
  positionAnchor: "var(--model-heart-anchor)",
  positionArea: "top",
  positionTry: "flip-block, flip-inline",
  positionTryFallbacks: "flip-block, flip-inline",
  positionVisibility: "anchors-visible",
  rounded: "md",
  whiteSpace: "nowrap",
  zIndex: "50",
});

export {
  heartAnchorStyle,
  heartGuestHintTriggerClassName,
  heartGuestRootClassName,
  heartSignInHintClassName,
};
