import Link from "next/link";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import { sanitiseName } from "@/utils/sanitise-name";
import { toggleLike } from "../actions/likes";
import type { ModelCardProps } from "../types";
import { HeartButtonClient } from "./heart-button/heart-button-client";

const ModelCard = ({
  isAuthenticated,
  model: { slug, name, description, categorySlug, likes, hasLiked },
}: ModelCardProps) => (
  <ViewTransition enter="enter" exit="exit">
    <article className="model-card model-animation corner-squircle relative isolate block rounded-lg bg-white shadow-md transition-transform duration-300 ease-out after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-model-card hover:-translate-y-0.5 hover:after:opacity-100">
      <ViewTransition name={`model-image-${sanitiseName(slug)}`}>
        <div className="relative aspect-square rounded-t-[inherit] contain-strict">
          <img
            alt={description}
            className="inline-full absolute inset-0 object-cover"
            height={300}
            src={placeholderImg.src}
            width={300}
          />
        </div>
      </ViewTransition>

      <div className="p-4">
        <div className="mbe-2 min-block-14 flex justify-between">
          <ViewTransition name={`model-title-${sanitiseName(slug)}`}>
            <h2 className="line-clamp-2 font-semibold text-gray-800 text-xl">
              <Link href={`/3d-models/${slug}`}>
                {name}
                <span className="inline-full block-full absolute inset-0 z-20" />
              </Link>
            </h2>
          </ViewTransition>
        </div>
        <p className="min-block-10 line-clamp-2 text-gray-800 text-sm leading-5">
          {description}
        </p>
        <div className="mbs-2">
          <Pill>{categorySlug}</Pill>
        </div>
        <div className="mbs-2 relative z-50 flex items-center text-gray-600">
          <HeartButtonClient
            hasLiked={hasLiked}
            isAuthenticated={isAuthenticated}
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
