"use client";

import { css, cx } from "@styled-system/css";
import { ViewTransition } from "react";
import { buttonRecipe } from "@/components/button-recipe";
import { FieldError } from "@/components/form/field-errors";
import type { IsAuthenticated } from "@/features/auth/types";
import { HeartButtonCount } from "@/features/models/likes/components/heart-button-count";
import { HeartIcon } from "@/features/models/likes/components/heart-icon";
import { useHeartLike } from "@/features/models/likes/hooks/use-heart-like";
import type {
  HasLiked,
  HeartButtonAdditionalProps,
} from "@/features/models/likes/types";
import type { Prettify } from "@/types";
import { sanitiseName } from "@/utils/sanitise-name";

export type HeartButtonClientProps = Prettify<
  HeartButtonAdditionalProps & HasLiked & IsAuthenticated
>;

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
          css({
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
        <HeartIcon visualState={visualState} />
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
