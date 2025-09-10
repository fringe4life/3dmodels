"use client";

import { clsx } from "clsx";
import { signIn } from "next-auth/react";
import { type MouseEventHandler, useActionState, useTransition } from "react";
import { FaHeart } from "react-icons/fa6";
import { toggleLike } from "@/features/models/actions/likes";

interface HeartButtonProps {
  modelId: number;
  hasLiked: boolean;
  likesCount: number;
  isAuthenticated: boolean;
}

export default function HeartButton({
  modelId,
  hasLiked,
  likesCount,
  isAuthenticated,
}: HeartButtonProps) {
  const [, formAction] = useActionState(toggleLike, null);
  const [isPending, startTransition] = useTransition();

  const handleLikeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      signIn();
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
      type="button"
      onClick={handleLikeClick}
      disabled={isPending}
      className="flex items-center transition-colors hover:text-red-500 disabled:opacity-50"
      aria-label={
        isAuthenticated ? "Like this model" : "Sign in to like this model"
      }
    >
      <FaHeart
        className={clsx("mr-1 h-5 w-5 transition-colors", {
          // Liked state - full red
          "text-red-500": hasLiked && !isPending,
          // Pending state - semi-transparent red
          "text-red-500/50": isPending,
          // Not liked state - gray with hover effect
          "text-gray-400 hover:text-red-500": !hasLiked && !isPending,
        })}
        aria-hidden="true"
      />
      <span>{likesCount}</span>
    </button>
  );
}
