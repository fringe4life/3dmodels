import { connection } from "next/server";
import type { Metadata } from "next/types";
import { Suspense } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import Pill from "@/components/pill";
import { toggleLike } from "@/features/models/actions/likes";
import HeartButtonClient from "@/features/models/components/heart-button-client";
import HeartButtonSkeleton from "@/features/models/components/heart-button-skeleton";
import { getAllModelIds } from "@/features/models/queries/get-all-model-ids";
import { getModelById } from "@/features/models/queries/get-model-by-id";
import { getLikeStatusOfModel } from "@/features/models/queries/get-model-with-like-status";
import { auth } from "@/lib/auth";

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

export async function HeartButtonContent({ modelId }: { modelId: number }) {
  // Use connection() to make this component dynamic at runtime
  // This allows us to access authentication data
  await connection();

  const session = await auth();
  const userId = session?.user?.id;
  const isAuthenticated = !!session;
  const { hasLiked, likesCount } = await getLikeStatusOfModel(modelId, userId);

  return (
    <HeartButtonClient
      hasLiked={hasLiked}
      isAuthenticated={isAuthenticated}
      likesCount={likesCount}
      modelId={modelId}
      toggleAction={toggleLike}
      userId={userId}
    />
  );
}
export default async function ModelDetailPage({
  params,
}: PageProps<"/3d-models/[id]">) {
  const { id } = await params;

  const { name, categorySlug, description, dateAdded } = await getModelById(id);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Section - Static */}
        <figure className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
          <img
            alt={`3D model of ${name}`}
            className="absolute inset-0 h-full w-full object-cover"
            height={300}
            src={placeholderImg.src}
            width={300}
          />
        </figure>

        {/* Content Section - Static with Dynamic Like Status */}
        <section className="flex h-full flex-col justify-center">
          {/* Dynamic Like Status */}
          <Suspense fallback={<HeartButtonSkeleton />}>
            <HeartButtonContent modelId={Number.parseInt(id, 10)} />
          </Suspense>

          {/* Static Content */}
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
  );
}
