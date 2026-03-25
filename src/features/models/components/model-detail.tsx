import Image from "next/image";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import { sanitiseName } from "@/utils/sanitise-name";
import type { ModelDetailProps } from "../types";

const ModelDetail = ({
  slug,
  name,
  categorySlug,
  description,
  dateAdded,
  children,
}: ModelDetailProps) => (
  <div className="corner-squircle max-inline-6xl mx-auto self-center rounded-lg px-4 py-8">
    <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ViewTransition name={`model-image-${sanitiseName(slug)}`}>
        <figure className="relative aspect-square rounded-lg shadow-lg contain-content">
          <Image
            alt={description}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            src={placeholderImg}
          />
        </figure>
      </ViewTransition>
      {/* Content Section - Static with Dynamic Like Status */}
      <section className="grid content-center">
        {/* Dynamic Like Status - passed as children */}
        {children}
        <ViewTransition name={`model-title-${sanitiseName(slug)}`}>
          <h1 className="mbe-6 font-bold text-4xl">{name}</h1>
        </ViewTransition>

        <Pill className="mbe-6 inline-fit">{categorySlug}</Pill>

        <div className="prose prose-lg mbe-6 max-inline-none">
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

export { ModelDetail };
