import type { Metadata } from "next";
import { FaRegHeart } from "react-icons/fa6";
import placeholderImg from "@/assets/images/placeholder.png";
import Pill from "@/components/Pill";
import { getModelById } from "@/features/models/queries/models";

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { name, description } = await getModelById(id);

  return {
    title: name,
    description: description,
    openGraph: {
      title: name,
      description: description,
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
  const { name, categorySlug, description, dateAdded, likes } =
    await getModelById(id);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <figure className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
          <img
            src={placeholderImg.src}
            alt={`3D model of ${name}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </figure>

        {/* Content Section */}
        <section className="flex h-full flex-col justify-center">
          <output
            className="mb-2 flex items-center text-2xl text-gray-600"
            aria-label="Likes count"
          >
            <FaRegHeart className="mr-2 h-5 w-5" aria-hidden="true" />
            <span className="font-light">{likes}</span>
          </output>
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
