import Link from "next/link";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import toggleLike from "@/features/models/actions/likes";
import { HeartButtonServer } from "@/features/models/components/heart-button/heart-button-server";
import type { ModelCardProps } from "../types";

const ModelCard = ({
  model: { slug, name, description, categorySlug },
}: ModelCardProps) => (
  <ViewTransition enter="enter" exit="exit" name={`model-${slug}`}>
    <article className="corner-squircle relative isolate block rounded-lg bg-white shadow-md transition-transform duration-300 ease-out after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-model-card hover:-translate-y-0.5 hover:after:opacity-100">
      <div className="relative aspect-square rounded-t-[inherit] contain-strict">
        <img
          alt={description}
          className="absolute inset-0 w-full object-cover"
          height={300}
          src={placeholderImg.src}
          width={300}
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex min-h-14 justify-between">
          <h2 className="line-clamp-2 font-semibold text-gray-800 text-xl">
            <Link href={`/3d-models/${slug}`}>
              {name}
              <span className="absolute inset-0 z-20 h-full w-full" />
            </Link>
          </h2>
        </div>
        <p className="line-clamp-2 min-h-10 text-gray-800 text-sm leading-5">
          {description}
        </p>
        <div className="mt-2">
          <Pill>{categorySlug}</Pill>
        </div>
        <div className="relative z-50 mt-2 flex items-center text-gray-600">
          <HeartButtonServer slug={slug} toggleAction={toggleLike} />
        </div>
      </div>
    </article>
  </ViewTransition>
);

export default ModelCard;
