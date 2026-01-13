"use client";

import { clsx } from "clsx";
import {
  type FormEventHandler,
  use,
  useActionState,
  useOptimistic,
  useTransition,
} from "react";
import { FaHeart } from "react-icons/fa6";
import { FieldError } from "@/components/form/field-errors";
import type {
  HeartButtonAdditionalProps,
  HeartButtonContentProps,
} from "@/features/models/types";
import { authClient } from "@/lib/auth-client";

const HeartButtonContent = (
  props: HeartButtonAdditionalProps & HeartButtonContentProps,
) => {
  const { likes, slug, toggleAction, ...likeStatus } = props;

  // Handle discriminated union: unwrap promise if present, otherwise use boolean
  const hasLiked =
    "hasLikedPromise" in likeStatus
      ? use(likeStatus.hasLikedPromise).hasLiked
      : "hasLiked" in likeStatus && likeStatus.hasLiked;

  const [state, formAction] = useActionState(toggleAction, null);
  const [isPending, startTransition] = useTransition();
  const [optimisticLike, setOptimisticLike] = useOptimistic(hasLiked);

  // Get the current likes count from server response if available, otherwise use prop
  // TypeScript knows state.data has likesCount when status is SUCCESS due to ActionState generic
  const serverLikesCount =
    state?.status === "SUCCESS" && state.data ? state.data.likesCount : likes;

  const [optimisticLikesCount, setOptimisticLikesCount] =
    useOptimistic(serverLikesCount);
  const session = authClient.useSession();
  const isAuthenticated = !!session.data?.user?.id;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      return;
    }

    startTransition(() => {
      const newLikedState = !optimisticLike;
      setOptimisticLike(newLikedState);
      // Update likes count optimistically: increment if liking, decrement if unliking
      const newLikesCount = newLikedState
        ? optimisticLikesCount + 1
        : optimisticLikesCount - 1;
      setOptimisticLikesCount(newLikesCount);
    });
  };

  const isDisabled = isPending || !isAuthenticated;
  const isLiked = optimisticLike && !isPending;
  const isNotLiked = !(optimisticLike || isPending);

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <input name="slug" type="hidden" value={slug} />
      <button
        aria-label={
          isAuthenticated ? "Like this model" : "Sign in to like this model"
        }
        className="group relative z-5 flex cursor-pointer flex-wrap items-center gap-x-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isDisabled}
        type="submit"
      >
        <FaHeart
          aria-hidden="true"
          className={clsx("aspect-square h-5 transition-colors duration-200", {
            "text-red-500": isLiked,
            "cursor-progress text-red-500/75": isPending,
            "text-gray-400 not-group-disabled:hover:text-red-500/50":
              isNotLiked,
          })}
        />
        <span>{optimisticLikesCount}</span>
        <FieldError actionState={state} name="slug" />
      </button>
    </form>
  );
};

export { HeartButtonContent };
