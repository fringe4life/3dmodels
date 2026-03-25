"use client";

import { clsx } from "clsx";
import {
  addTransitionType,
  type SubmitEventHandler,
  useActionState,
  useMemo,
  useOptimistic,
  useTransition,
} from "react";
import { FaHeart } from "react-icons/fa6";
import { FieldError } from "@/components/form/field-errors";
import type { HeartButtonClientProps } from "@/features/models/types";
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
        className="group relative z-5 flex cursor-pointer flex-wrap items-center gap-x-1 transition-[scale,opacity] duration-200 ease-in-out not-disabled:hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 supports-linear:ease-smooth-in-out"
        disabled={isDisabled}
        type="submit"
      >
        <FaHeart
          aria-hidden="true"
          className={clsx(
            "block-6 aspect-square transition-colors duration-200 ease-in-out supports-linear:ease-smooth-in-out",
            {
              "text-red-500": isLiked,
              "cursor-progress text-red-500/75": isPending,
              "text-gray-400 not-group-disabled:hover:text-red-500/50":
                isNotLiked,
            },
          )}
        />
        <HeartButtonCount likesCount={optimistic.likesCount} />
        <FieldError actionState={state} name="slug" />
      </button>
    </form>
  );
};

export { HeartButtonClient };
