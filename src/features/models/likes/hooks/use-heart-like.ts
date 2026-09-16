"use client";

import { useOptimisticStateAction } from "next-safe-action/hooks";
import { addTransitionType, useMemo } from "react";
import type { ActionFieldErrorsOf } from "@/components/form/field-errors";
import type { Prettify } from "@/types";
import type { HeartButtonClientProps } from "../components/heart-button-client";
import type { HeartVisualState } from "../types";
import {
  type HeartLikeOptimisticState,
  reduceHeartLikeOptimistic,
} from "./heart-like-optimistic";

type UseHeartLikeParams = Prettify<
  Pick<HeartButtonClientProps, "hasLiked" | "likes" | "toggleAction">
>;

interface UseHeartLikeReturn {
  fieldErrors:
    | ActionFieldErrorsOf<UseHeartLikeParams["toggleAction"]>
    | undefined;
  formAction: (payload: FormData) => void;
  isDisabled: boolean;
  isPending: boolean;
  optimistic: HeartLikeOptimisticState;
  visualState: HeartVisualState;
}

const TOGGLE_OPTIMISTIC = { type: "toggle" } as const;

const useHeartLike = ({
  hasLiked,
  likes,
  toggleAction,
}: UseHeartLikeParams): UseHeartLikeReturn => {
  const currentState = useMemo(
    (): HeartLikeOptimisticState => ({ hasLiked, likes }),
    [hasLiked, likes],
  );

  const {
    formAction: dispatchHeart,
    isPending,
    optimisticState,
    result,
  } = useOptimisticStateAction(toggleAction, {
    currentState,
    updateFn: (state) => reduceHeartLikeOptimistic(state, TOGGLE_OPTIMISTIC),
  });

  const formAction = (payload: FormData) => {
    addTransitionType(optimisticState.hasLiked ? "decrease" : "increase");
    dispatchHeart(payload);
  };

  const isDisabled = isPending;

  let visualState: HeartVisualState = "unliked";
  if (isPending) {
    visualState = "pending";
  } else if (optimisticState.hasLiked) {
    visualState = "liked";
  }

  return {
    fieldErrors: result.validationErrors?.fieldErrors,
    formAction,
    isDisabled,
    isPending,
    optimistic: optimisticState,
    visualState,
  };
};

export { useHeartLike };
