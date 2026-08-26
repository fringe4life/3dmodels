import { cx } from "@styled-system/css";
import Image from "next/image";
import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { Pill } from "@/components/pill";
import type { Likes } from "@/features/models/likes/types";
import { PLACEHOLDER_IMAGE_SRC } from "@/lib/placeholder-image";
import type { Children, Prettify } from "@/types";
import { sanitiseName } from "@/utils/sanitise-name";
import type { getModelBySlug } from "../queries/get-model-by-slug";
import {
  modelDetailCategory,
  modelDetailContainer,
  modelDetailContent,
  modelDetailDescription,
  modelDetailFooter,
  modelDetailFrame,
  modelDetailImage,
  modelDetailMedia,
  modelDetailSurface,
  modelDetailTitle,
} from "./model-detail.styles";

type ModelDetailProps = Prettify<
  NonNullable<Awaited<ReturnType<typeof getModelBySlug>>> &
    Likes &
    Partial<Children> & {
      header?: ReactNode;
    }
>;

const ModelDetail = ({
  slug,
  name,
  image,
  categorySlug,
  description,
  dateAdded,
  children,
  header,
}: ModelDetailProps) => {
  const transitionSlug = sanitiseName(slug);

  return (
    <div className={cx(modelDetailContainer, modelDetailFrame)}>
      {header}
      <article className={modelDetailSurface}>
        <ViewTransition name={`model-image-${transitionSlug}`}>
          <figure className={modelDetailMedia}>
            <Image
              alt={description}
              className={modelDetailImage}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              src={image || PLACEHOLDER_IMAGE_SRC}
            />
          </figure>
        </ViewTransition>
        <section className={modelDetailContent}>
          <ViewTransition name={`model-title-${transitionSlug}`}>
            <h1 className={modelDetailTitle}>{name}</h1>
          </ViewTransition>
          <Pill className={modelDetailCategory}>{categorySlug}</Pill>
          <div className={modelDetailDescription}>
            <p>{description}</p>
          </div>
          <footer className={modelDetailFooter}>
            <time dateTime={dateAdded.toISOString()}>
              Added on {dateAdded.toLocaleDateString()}
            </time>
            {children}
          </footer>
        </section>
      </article>
    </div>
  );
};

export { ModelDetail };
