"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { type ModelWithLike, toggleLike } from "@/actions/likes";
import Pill from "@/components/Pill";
import { useAuth } from "@/hooks/useAuth";
import placeholderImg from "../../../../public/placeholder.png";

type ModelCardProps = {
  model: ModelWithLike;
};

export default function ModelCard({ model }: ModelCardProps) {
  const { isAuthenticated, signIn } = useAuth();
  const [, formAction, isPending] = useActionState(toggleLike, null);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      signIn();
      return;
    }

    const formData = new FormData();
    formData.append("modelId", model.id.toString());
    formAction(formData);
  };

  return (
    <Link
      href={`/3d-models/${model.id}`}
      className="group hover:-translate-y-[3px] relative block transition-transform duration-300 ease-out"
      aria-labelledby={`model-${model.id}-title`}
    >
      <article className="relative overflow-hidden rounded-lg bg-white shadow-md">
        {/* Pseudo-element for hover shadow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[0_5px_12px_rgba(0,0,0,0.1)] transition-opacity duration-300 ease-out group-hover:opacity-100" />
        <div className="relative aspect-square contain-strict">
          <img
            src={placeholderImg.src}
            alt={model.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 flex min-h-14 justify-between">
            <h2
              id={`model-${model.id}-title`}
              className="line-clamp-2 font-semibold text-gray-800 text-xl"
            >
              {model.name}
            </h2>
          </div>
          <p className="line-clamp-2 min-h-10 text-gray-800 text-sm leading-5">
            {model.description}
          </p>
          <div className="mt-2">
            <Pill>{model.categorySlug}</Pill>
          </div>
          <div className="mt-2 flex items-center text-gray-600">
            <button
              type="button"
              onClick={handleLikeClick}
              disabled={isPending}
              className="flex items-center transition-colors hover:text-red-500 disabled:opacity-50"
              aria-label={
                isAuthenticated
                  ? "Like this model"
                  : "Sign in to like this model"
              }
            >
              {model.hasLiked ? (
                <FaHeart
                  className="mr-1 h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              ) : (
                <FaRegHeart
                  className="mr-1 h-5 w-5 text-gray-400 hover:text-red-500"
                  aria-hidden="true"
                />
              )}
              <span>{model.likes}</span>
            </button>
            <span className="sr-only">This model has {model.likes} likes</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
