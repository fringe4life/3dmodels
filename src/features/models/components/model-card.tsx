import Link from "next/link";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import Pill from "@/components/pill";
import type { Model } from "@/db/schema/models";
import { toggleLike } from "../actions/likes";
import { HeartButtonServer } from "./heart-button-server";

type ModelCardProps = {
  model: Model;
};

export default function ModelCard({ model }: ModelCardProps) {
  const { slug, name, description, categorySlug } = model;
  return (
    <ViewTransition enter="enter" exit="exit" name={`model-${slug}`}>
      <article className="group hover:-translate-y-[3px] relative block overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 ease-out">
        {/* Pseudo-element for hover shadow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[0_5px_12px_rgba(0,0,0,0.1)] transition-opacity duration-300 ease-out group-hover:opacity-100" />

        {/* Shared element transition for the model image */}
        <div className="relative aspect-square contain-strict">
          <img
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
            height={300}
            src={placeholderImg.src}
            width={300}
          />
        </div>

        <div className="p-4">
          <div className="mb-2 flex min-h-14 justify-between">
            <h2
              className="line-clamp-2 font-semibold text-gray-800 text-xl"
              id={`model-${slug}-title`}
            >
              <Link href={`/3d-models/${slug}`}>
                {name}
                <span className="absolute inset-0 h-full w-full" />
              </Link>
            </h2>
          </div>
          <p className="line-clamp-2 min-h-10 text-gray-800 text-sm leading-5">
            {description}
          </p>
          <div className="mt-2">
            <Pill>{categorySlug}</Pill>
          </div>
          <div className="mt-2 flex items-center text-gray-600">
            <HeartButtonServer slug={slug} toggleAction={toggleLike} />
          </div>
        </div>
      </article>
    </ViewTransition>
  );
}
