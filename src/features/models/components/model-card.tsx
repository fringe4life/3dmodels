import Link from "next/link";
import placeholderImg from "@/assets/images/placeholder.png";
import Pill from "@/components/pill";
import type { Model } from "@/db/schema";
import LikeStatus from "./like-status";

type ModelCardProps = {
  model: Model;
};

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link
      aria-labelledby={`model-${model.id}-title`}
      className="group hover:-translate-y-[3px] relative block transition-transform duration-300 ease-out"
      href={`/3d-models/${model.id}`}
    >
      <article className="relative overflow-hidden rounded-lg bg-white shadow-md">
        {/* Pseudo-element for hover shadow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[0_5px_12px_rgba(0,0,0,0.1)] transition-opacity duration-300 ease-out group-hover:opacity-100" />
        <div className="relative aspect-square contain-strict">
          <img
            alt={model.name}
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
              id={`model-${model.id}-title`}
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
            <LikeStatus likesCount={model.likes} modelId={model.id} />
            <span className="sr-only">This model has {model.likes} likes</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
