"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import { sanitiseName } from "@/utils/sanitise-name";
import { toggleLike } from "../actions/likes";
import type { ModelCardProps } from "../types";
import { HeartButtonWrapper } from "./heart-button/heart-button-wrapper";

const ModelCard = ({
  model: { slug, name, description, categorySlug, likes, hasLikedPromise },
}: ModelCardProps) => (
  <ViewTransition enter="enter" exit="exit">
    <article className="model-card model-animation corner-squircle relative isolate block rounded-lg bg-white shadow-md transition-transform duration-300 ease-out after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-model-card hover:-translate-y-0.5 hover:after:opacity-100">
      <ViewTransition name={`model-image-${sanitiseName(slug)}`}>
        <div className="relative aspect-square rounded-t-[inherit] contain-strict">
          <img
            alt={description}
            className="absolute inset-0 w-full object-cover"
            height={300}
            src={placeholderImg.src}
            width={300}
          />
        </div>
      </ViewTransition>

      <div className="p-4">
        <div className="mb-2 flex min-h-14 justify-between">
          <ViewTransition name={`model-title-${sanitiseName(slug)}`}>
            <h2 className="line-clamp-2 font-semibold text-gray-800 text-xl">
              <Link href={`/3d-models/${slug}`}>
                {name}
                <span className="absolute inset-0 z-20 h-full w-full" />
              </Link>
            </h2>
          </ViewTransition>
        </div>
        <p className="line-clamp-2 min-h-10 text-gray-800 text-sm leading-5">
          {description}
        </p>
        <div className="mt-2">
          <Pill>{categorySlug}</Pill>
        </div>
        <div className="relative z-50 mt-2 flex items-center text-gray-600">
          <HeartButtonWrapper
            hasLikedPromise={hasLikedPromise}
            likes={likes}
            slug={slug}
            toggleAction={toggleLike}
          />
        </div>
      </div>
    </article>
  </ViewTransition>
);
export { ModelCard };
