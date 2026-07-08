import { css, cx } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import { prose } from "@styled-system/recipes";
import Image from "next/image";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import type { Likes } from "@/features/models/likes/types";
import type { Children, Prettify } from "@/types";
import { sanitiseName } from "@/utils/sanitise-name";
import type { getModelBySlug } from "../queries/get-model-by-slug";

type ModelDetailProps = Prettify<
  NonNullable<Awaited<ReturnType<typeof getModelBySlug>>> &
    Likes &
    Partial<Children>
>;

const ModelDetail = ({
  slug,
  name,
  image,
  categorySlug,
  description,
  dateAdded,
  children,
}: ModelDetailProps) => (
  <div
    className={css({
      alignSelf: "center",
      marginInline: "auto",
      maxInlineSize: "6xl",
      paddingBlock: 8,
      paddingInline: 4,
      rounded: "lg",
    })}
  >
    <article className={grid({ columns: { base: 1, lg: 2 }, gap: 8 })}>
      <ViewTransition name={`model-image-${sanitiseName(slug)}`}>
        <figure
          className={css({
            aspectRatio: "square",
            contain: "content",
            position: "relative",
            rounded: "lg",
            shadow: "lg",
          })}
        >
          <Image
            alt={description}
            className={css({ objectFit: "cover" })}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            src={image || placeholderImg}
          />
        </figure>
      </ViewTransition>
      {/* Content Section - Static with Dynamic Like Status */}
      <section className={grid({ alignContent: "center" })}>
        {/* Dynamic Like Status - passed as children */}
        {children}
        <ViewTransition name={`model-title-${sanitiseName(slug)}`}>
          <h1
            className={css({
              fontSize: "4xl",
              fontWeight: "bold",
              marginBlockEnd: 6,
            })}
          >
            {name}
          </h1>
        </ViewTransition>

        <Pill
          className={gridItem({
            alignSelf: "center",
            inlineSize: "fit-content",
            marginBlockEnd: 6,
          })}
        >
          {categorySlug}
        </Pill>
        <div
          className={cx(
            css({ marginBlockEnd: 6, maxInlineSize: "none" }),
            prose({ size: "lg" }),
          )}
        >
          <p
            className={css({ color: "text.secondary", lineHeight: "relaxed" })}
          >
            {description}
          </p>
        </div>

        <footer className={css({ color: "text.muted", fontSize: "sm" })}>
          <time dateTime={dateAdded.toISOString()}>
            Added on {dateAdded.toLocaleDateString()}
          </time>
        </footer>
      </section>
    </article>
  </div>
);

export { ModelDetail };
