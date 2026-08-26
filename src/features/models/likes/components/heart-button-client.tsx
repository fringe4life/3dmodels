"use client";

import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { ViewTransition } from "react";
import { FaHeart } from "react-icons/fa6";
import { buttonRecipe } from "@/components/button-recipe";
import { FieldError } from "@/components/form/field-errors";
import type { IsAuthenticated } from "@/features/auth/types";
import { HeartButtonCount } from "@/features/models/likes/components/heart-button-count";
import { useHeartLike } from "@/features/models/likes/hooks/use-heart-like";
import type {
  HasLiked,
  HeartButtonAdditionalProps,
  HeartVisualState,
} from "@/features/models/likes/types";
import type { Prettify } from "@/types";
import { sanitiseName } from "@/utils/sanitise-name";

export type HeartButtonClientProps = Prettify<
  HeartButtonAdditionalProps & HasLiked & IsAuthenticated
>;

/**
 * Paint via `_icon` (`& :where(svg)`). FaHeart fill/stroke use `currentColor`,
 * so SVG needs its own `color` — button `color` alone not reliable vs ghost.
 * Hover locked when disabled so guests get no "can like" cue.
 */
const heartColorByState = {
  liked: css({
    _hover: { _icon: { color: "like.hover" } },
    _icon: { color: "like" },
  }),
  pending: css({
    _icon: { color: "like.pending" },
    cursor: "progress",
  }),
  unliked: css({
    _hover: { _icon: { color: "like.hover" } },
  }),
} as const satisfies Record<HeartVisualState, string>;

const heartIconDisabledColorByState = {
  liked: css({
    // Panda emits hover rules after group-disabled rules.
    _groupDisabled: { color: "like !important" },
  }),
  pending: "",
  unliked: css({
    _groupDisabled: { color: "text.placeholder !important" },
  }),
} as const satisfies Record<HeartVisualState, string>;

const HeartButtonClient = ({
  hasLiked,
  isAuthenticated,
  likes,
  slug,
  toggleAction,
  disableTransition,
}: HeartButtonClientProps) => {
  const {
    handleSubmit,
    isDisabled,
    isPending,
    optimistic,
    state,
    visualState,
  } = useHeartLike({
    hasLiked,
    isAuthenticated,
    likes,
    slug,
    toggleAction,
  });

  const content = (
    <form data-progress={isPending} onSubmit={handleSubmit}>
      <button
        aria-label={
          isAuthenticated ? "Like this model" : "Sign in to like this model"
        }
        className={cx(
          "group",
          buttonRecipe({ size: "bare", variant: "ghost" }),
          heartColorByState[visualState],
          css({
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
          }),
        )}
        disabled={isDisabled}
        type="submit"
      >
        <FaHeart
          aria-hidden="true"
          className={cx(
            square({ size: 6 }),
            heartIconDisabledColorByState[visualState],
          )}
        />
        <HeartButtonCount likesCount={optimistic.likesCount} />
        <FieldError actionState={state} name="slug" />
      </button>
    </form>
  );

  if (disableTransition) {
    return content;
  }

  return (
    <ViewTransition name={`model-heart-${sanitiseName(slug)}`}>
      {content}
    </ViewTransition>
  );
};

export { HeartButtonClient };
