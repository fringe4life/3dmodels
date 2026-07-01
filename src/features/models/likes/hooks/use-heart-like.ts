"use client";

import {
  addTransitionType,
  type SubmitEventHandler,
  useActionState,
  useOptimistic,
  useTransition,
} from "react";
import type { Maybe } from "@/types";
import type { ActionState } from "@/utils/to-action-state";
import type { HeartButtonClientProps } from "../components/heart-button-client";
import type { HeartVisualState, LikesCount } from "../types";
import {
  createHeartLikePassthrough,
  type HeartLikeOptimisticState,
  reduceHeartLikeOptimistic,
} from "./heart-like-optimistic";

type UseHeartLikeParams = Pick<
  HeartButtonClientProps,
  "hasLiked" | "isAuthenticated" | "likes" | "slug" | "toggleAction"
>;

interface UseHeartLikeReturn extends HeartVisualState {
  handleSubmit: SubmitEventHandler<HTMLFormElement>;
  isDisabled: boolean;
  optimistic: HeartLikeOptimisticState;
  state: Maybe<ActionState<LikesCount>>;
}

const useHeartLike = ({
  hasLiked,
  isAuthenticated,
  likes,
  slug,
  toggleAction,
}: UseHeartLikeParams): UseHeartLikeReturn => {
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
    const newTransitionType = optimistic.hasLiked ? "decrease" : "increase";
    startTransition(async () => {
      addTransitionType(newTransitionType);
      addOptimistic({ type: "toggle" });
      await formAction(new FormData(e.currentTarget));
    });
  };

  const isDisabled = isPending || !isAuthenticated;
  const isLiked = optimistic.hasLiked && !isPending;
  const isNotLiked = !(optimistic.hasLiked || isPending);

  return {
    handleSubmit,
    isDisabled,
    isLiked,
    isNotLiked,
    isPending,
    optimistic,
    state,
  };
};

export { useHeartLike };
