"use client";

import {
  addTransitionType,
  type SubmitEventHandler,
  useActionState,
  useMemo,
  useOptimistic,
  useTransition,
} from "react";
import { FaHeart } from "react-icons/fa6";
import { buttonRecipe } from "@/components/button";
import { FieldError } from "@/components/form/field-errors";
import type { HeartButtonClientProps } from "@/features/models/types";
import { css, cx } from "../../../../../styled-system/css";
import { square } from "../../../../../styled-system/patterns";
import { HeartButtonCount } from "./heart-button-count";
import {
  createHeartLikePassthrough,
  reduceHeartLikeOptimistic,
} from "./heart-like-optimistic";

const HeartButtonClient = (props: HeartButtonClientProps) => {
  const { hasLiked, isAuthenticated, likes, slug, toggleAction } = props;

  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(
    toggleAction.bind(null, slug),
    null,
  );

  const serverLikesCount =
    state?.status === "SUCCESS" && state.data ? state.data.likesCount : likes;

  // Stable passthrough reference: useOptimistic returns this same object when
  // there is no pending optimistic queue, so a fresh `{ liked, likesCount }`
  // every render would churn `optimistic`'s identity even when values are
  // unchanged (effects, memo deps, memoized children). The hook does not rely
  // on reference equality to reconcile passthrough—this is not a correctness
  // requirement, only identity stability.
  const passthrough = useMemo(
    () => createHeartLikePassthrough(hasLiked, serverLikesCount),
    [hasLiked, serverLikesCount],
  );

  const [optimistic, addOptimistic] = useOptimistic(
    passthrough,
    reduceHeartLikeOptimistic,
  );

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return;
    }

    startTransition(async () => {
      addTransitionType(optimistic.liked ? "decrease" : "increase");
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
            columnGap: "1",
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
