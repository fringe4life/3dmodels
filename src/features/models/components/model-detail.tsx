import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import toggleLike from "@/features/models/actions/likes";
import { HeartButtonServer } from "@/features/models/components/heart-button/heart-button-server";
import type { getModelBySlug } from "@/features/models/queries/get-model-by-slug";

const ModelDetail = ({
  slug,
  name,
  categorySlug,
  description,
  dateAdded,
}: NonNullable<Awaited<ReturnType<typeof getModelBySlug>>>) => (
  <ViewTransition name={`model-${slug}`}>
    <div className="corner-squircle mx-auto max-w-6xl self-center rounded-lg px-4 py-8">
      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <figure className="relative aspect-square rounded-lg shadow-lg contain-content">
          <img
            alt={description}
            className="absolute inset-0 h-full w-full object-cover"
            height={300}
            src={placeholderImg.src}
            width={300}
          />
        </figure>

        {/* Content Section - Static with Dynamic Like Status */}
        <section className="grid content-center">
          {/* Dynamic Like Status */}
          <HeartButtonServer slug={slug} toggleAction={toggleLike} />
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

export default ModelDetail;
