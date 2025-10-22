import Link from "next/link";
import placeholderImg from "@/assets/images/placeholder.png";
import Pill from "@/components/pill";
import type { Model } from "@/db/schema/models";
import HeartButton from "./heart-button";

type ModelCardProps = {
  model: Model;
};

// Skeleton component for loading state
// biome-ignore lint/suspicious/useAwait: needed for use cache
export async function ModelCardSkeleton() {
  "use cache";
  return (
    <div className="relative block">
      <article className="relative overflow-hidden rounded-lg bg-white shadow-md">
        <div className="relative aspect-square contain-strict">
          <div className="absolute inset-0 h-full w-full animate-pulse bg-gray-200" />
        </div>
        <div className="p-4">
          <div className="mb-2 flex min-h-14 justify-between">
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mt-2">
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mt-2 flex items-center">
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </article>
    </div>
  );
}

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
            <HeartButton modelId={model.id} />
          </div>
        </div>
      </article>
    </Link>
  );
}
