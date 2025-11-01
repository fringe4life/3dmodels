"use client";

import { clsx } from "clsx";
import { type MouseEventHandler, useActionState, useTransition } from "react";
import { FaHeart } from "react-icons/fa6";
import type { toggleLike } from "@/features/models/actions/likes";

export type HeartButtonClientProps = {
  slug: string;
  likesCount: number;
  hasLiked: boolean;
  isAuthenticated: boolean;
  userId?: string | null;
  toggleAction: typeof toggleLike;
};

export default function HeartButtonClient({
  slug,
  likesCount,
  hasLiked,
  isAuthenticated,
  userId,
  toggleAction,
}: HeartButtonClientProps) {
  const [, formAction] = useActionState(toggleAction, null);
  const [isPending, startTransition] = useTransition();

  const handleLikeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return;
    }

    startTransition(() => {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("userId", userId ?? "");
      formAction(formData);
    });
  };

  return (
    <button
      aria-label={
        isAuthenticated ? "Like this model" : "Sign in to like this model"
      }
      className="flex items-center transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isPending || !isAuthenticated}
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
