import type { Metadata } from "next/types";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import Pill from "@/components/pill";
import Stream from "@/components/streamable";
import { toggleLike } from "@/features/models/actions/likes";
import { HeartButtonServer } from "@/features/models/components/heart-button-server";
import HeartButtonSkeleton from "@/features/models/components/heart-button-skeleton";
import { getAllModelIds } from "@/features/models/queries/get-all-model-ids";
import { getModelById } from "@/features/models/queries/get-model-by-id";

export async function generateStaticParams() {
  // Generate static params for all existing models at build time
  return await getAllModelIds();
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { name, description } = await getModelById(id);

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      type: "article",
      images: [
        {
          url: "/placeholder.png",
          width: 1200,
          height: 630,
          alt: `3D model of ${name}`,
        },
      ],
    },
  };
}

export default async function ModelDetailPage({
  params,
}: PageProps<"/3d-models/[id]">) {
  const { id } = await params;

  const { name, categorySlug, description, dateAdded } = await getModelById(id);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Section - Static with shared element transition */}
        <ViewTransition name={`model-image-${id}`}>
          <figure className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
            <img
              alt={`3D model of ${name}`}
              className="absolute inset-0 h-full w-full object-cover"
              height={300}
              src={placeholderImg.src}
              width={300}
            />
          </figure>
        </ViewTransition>

        {/* Content Section - Static with Dynamic Like Status */}
        <section className="flex h-full flex-col justify-center">
          {/* Dynamic Like Status */}
          <Stream fallback={<HeartButtonSkeleton />} value={null}>
            {() => (
              <HeartButtonServer
                modelId={Number.parseInt(id, 10)}
                toggleAction={toggleLike}
              />
            )}
          </Stream>

          {/* Static Content with shared element transition for title */}
          <ViewTransition name={`model-title-${id}`}>
            <h1 className="mb-6 font-bold text-4xl">{name}</h1>
          </ViewTransition>

          <Pill className="mb-6 w-fit">{categorySlug}</Pill>

          <div className="prose prose-lg mb-6 max-w-none">
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          <footer className="text-gray-500 text-sm">
            <time dateTime={dateAdded.toISOString()}>
              Added on {dateAdded.toLocaleDateString()}
            </time>
          </footer>
        </section>
      </article>
    </div>
  );
}
