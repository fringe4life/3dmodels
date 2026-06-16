"use client";

import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import {
  addTransitionType,
  type SubmitEventHandler,
  useActionState,
  useOptimistic,
  useTransition,
} from "react";
import { FaHeart } from "react-icons/fa6";
import { buttonRecipe } from "@/components/button";
import { FieldError } from "@/components/form/field-errors";
import type { HeartButtonClientProps } from "@/features/models/types";
import { HeartButtonCount } from "./heart-button-count";
import {
  createHeartLikePassthrough,
  reduceHeartLikeOptimistic,
} from "./heart-like-optimistic";

const HeartButtonClient = ({
  hasLiked,
  isAuthenticated,
  likes,
  slug,
  toggleAction,
}: HeartButtonClientProps) => {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(
    toggleAction.bind(null, slug),
    null,
  );

  const serverLikesCount =
    state?.status === "SUCCESS" && state.data ? state.data.likesCount : likes;

  const passthrough = createHeartLikePassthrough(hasLiked, serverLikesCount);

  const [optimistic, addOptimistic] = useOptimistic(
    passthrough,
    reduceHeartLikeOptimistic,
  );

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return;
    }
    const newTransitionType = optimistic.liked ? "decrease" : "increase";
    startTransition(async () => {
      addTransitionType(newTransitionType);
      addOptimistic({ type: "toggle" });
      await formAction(new FormData(e.currentTarget));
    });
  };

  // derived state for button state
  const isDisabled = isPending || !isAuthenticated;
  const isLiked = optimistic.liked && !isPending;
  const isNotLiked = !(optimistic.liked || isPending);

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
        <FaHeart
          aria-hidden="true"
          className={cx(
            square({ size: 6 }),
            css({
              transitionProperty: "color",
              transitionDuration: "normal",
              transitionTimingFunction: {
                base: "ease-in-out",
                _supportsLinear: "ease-smooth-in-out",
              },
            }),
            isLiked && css({ color: { base: "like", _hover: "like.hover" } }),
            isPending && css({ cursor: "progress", color: "like.pending" }),
            isNotLiked &&
              css({
                color: {
                  base: "text.placeholder",
                  _groupHover: "like.hover",
                  _groupDisabled: "text.placeholder",
                },
              }),
          )}
        />
        <HeartButtonCount likesCount={optimistic.likesCount} />
        <FieldError actionState={state} name="slug" />
      </button>
    </form>
  );
};

export { HeartButtonClient };
