import type { Metadata } from "next/types";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import Pill from "@/components/pill";
import Stream from "@/components/streamable";
import { toggleLike } from "@/features/models/actions/likes";
import { HeartButtonServer } from "@/features/models/components/heart-button-server";
import HeartButtonSkeleton from "@/features/models/components/heart-button-skeleton";
import { getAllModelSlugs } from "@/features/models/queries/get-all-model-slugs";
import { getModelBySlug } from "@/features/models/queries/get-model-by-slug";

export async function generateStaticParams() {
  return await getAllModelSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { name, description } = await getModelBySlug(slug);

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
}: PageProps<"/3d-models/[slug]">) {
  const { slug } = await params;

  const { name, categorySlug, description, dateAdded } =
    await getModelBySlug(slug);

  return (
    <ViewTransition name={`model-${slug}`}>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <figure className="relative aspect-square rounded-lg shadow-lg contain-content">
            <img
              alt={`3D model of ${name}`}
              className="absolute inset-0 h-full w-full object-cover"
              height={300}
              src={placeholderImg.src}
              width={300}
            />
          </figure>

          {/* Content Section - Static with Dynamic Like Status */}
          <section className="grid content-center">
            {/* Dynamic Like Status */}
            <Stream
              fallback={<HeartButtonSkeleton />}
              value={HeartButtonServer({
                modelSlug: slug,
                toggleAction: toggleLike,
              })}
            >
              {(content) => content}
            </Stream>
            <h1 className="mb-6 font-bold text-4xl">{name}</h1>

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
    </ViewTransition>
  );
}
