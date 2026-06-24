"use client";

import { css, cx } from "@styled-system/css";
import { buttonRecipe } from "@/components/button";
import { FieldError } from "@/components/form/field-errors";
import { HeartButtonCount } from "@/features/models/likes/components/heart-button-count";
import { HeartIcon } from "@/features/models/likes/components/heart-icon";
import { useHeartLike } from "@/features/models/likes/hooks/use-heart-like";
import type { HeartButtonClientProps } from "@/features/models/likes/types";

const HeartButtonClient = ({
  hasLiked,
  isAuthenticated,
  likes,
  slug,
  toggleAction,
}: HeartButtonClientProps) => {
  const {
    handleSubmit,
    isDisabled,
    isLiked,
    isNotLiked,
    isPending,
    optimistic,
    state,
  } = useHeartLike({
    hasLiked,
    isAuthenticated,
    likes,
    slug,
    toggleAction,
  });

  return (
    <form data-progress={isPending} onSubmit={handleSubmit}>
      <button
        aria-label={
          isAuthenticated ? "Like this model" : "Sign in to like this model"
        }
        className={cx(
          "group",
          buttonRecipe({ variant: "ghost", size: "bare" }),
          css({
            position: "relative",
            zIndex: "5",
            flexWrap: "wrap",
            columnGap: 1,
            transitionTimingFunction: {
              _supportsLinear: "ease-smooth-in-out",
            },
          }),
        )}
        disabled={isDisabled}
        type="submit"
      >
        <HeartIcon
          isLiked={isLiked}
          isNotLiked={isNotLiked}
          isPending={isPending}
        />
        <HeartButtonCount likesCount={optimistic.likesCount} />
        <FieldError actionState={state} name="slug" />
      </button>
    </form>
  );
};

export { HeartButtonClient };
