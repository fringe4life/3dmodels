"use client";

import { clsx } from "clsx";
import {
  type MouseEventHandler,
  useActionState,
  useOptimistic,
  useTransition,
} from "react";
import { FaHeart } from "react-icons/fa6";
import type { toggleLike } from "@/features/models/actions/likes";

export type HeartButtonClientProps = {
  slug: string;
  likesCount: number;
  hasLiked: boolean;
  isAuthenticated: boolean;
  toggleAction: typeof toggleLike;
};

export default function HeartButtonClient({
  slug,
  likesCount,
  hasLiked,
  isAuthenticated,
  toggleAction,
}: HeartButtonClientProps) {
  const [, formAction] = useActionState(toggleAction, null);
  const [isPending, startTransition] = useTransition();
  const [optimisticLike, setOptimisticLike] = useOptimistic(hasLiked);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!isAuthenticated) {
      return;
    }
    const formData = new FormData();
    formData.append("modelSlug", slug);

    startTransition(() => {
      setOptimisticLike(!optimisticLike);
      formAction(formData);
    });
  };

  const isDisabled = isPending || !isAuthenticated;
  const isLiked = optimisticLike && !isPending;
  const isNotLiked = !(optimisticLike || isPending);
  return (
    <button
      aria-label={
        isAuthenticated ? "Like this model" : "Sign in to like this model"
      }
      className="relative z-5 flex cursor-pointer items-center gap-x-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isDisabled}
      onClick={handleClick}
      type="button"
    >
      <FaHeart
        aria-hidden="true"
        className={clsx("aspect-square h-5 transition-colors duration-200", {
          "text-red-500": isLiked,
          "cursor-progress text-red-500/75": isPending,
          "text-gray-400 hover:text-red-500/50": isNotLiked,
        })}
      />
      <span>{likesCount}</span>
    </button>
  );
}
