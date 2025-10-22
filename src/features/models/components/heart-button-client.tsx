"use client";

import { clsx } from "clsx";
import { type MouseEventHandler, useActionState, useTransition } from "react";
import { FaHeart } from "react-icons/fa6";
import type { HasAuth } from "@/dal/auth-helpers";
import { toggleLike } from "@/features/models/actions/likes";

type HeartButtonClientProps = {
  modelId: number;
  likesCount: number;
  hasLiked: boolean;
} & HasAuth;

export default function HeartButtonClient({
  modelId,
  likesCount,
  isAuthenticated,
  hasLiked,
}: HeartButtonClientProps) {
  const [, formAction] = useActionState(toggleLike, null);
  const [isPending, startTransition] = useTransition();

  const handleLikeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return;
    }

    startTransition(() => {
      const formData = new FormData();
      formData.append("modelId", modelId.toString());
      formAction(formData);
    });
  };

  return (
    <button
      aria-label={
        isAuthenticated ? "Like this model" : "Sign in to like this model"
      }
      className="flex items-center transition-colors hover:text-red-500 disabled:opacity-50"
      disabled={isPending}
      onClick={handleLikeClick}
      type="button"
    >
      <FaHeart
        aria-hidden="true"
        className={clsx("mr-1 h-5 w-5 transition-colors", {
          // Liked state - full red
          "text-red-500": hasLiked && !isPending,
          // Pending state - semi-transparent red
          "text-red-500/50": isPending,
          // Not liked state - gray with hover effect
          "text-gray-400 hover:text-red-500": !(hasLiked || isPending),
        })}
      />
      <span>{likesCount}</span>
    </button>
  );
}
