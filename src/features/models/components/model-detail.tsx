import Image from "next/image";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import { sanitiseName } from "@/utils/sanitise-name";
import { css, cx } from "../../../../styled-system/css";
import { grid, gridItem } from "../../../../styled-system/patterns";
import { prose } from "../../../../styled-system/recipes";
import type { ModelDetailProps } from "../types";

const ModelDetail = ({
  slug,
  name,
  categorySlug,
  description,
  dateAdded,
  children,
}: ModelDetailProps) => (
  <div
    className={css({
      maxInlineSize: "6xl",
      marginInline: "auto",
      alignSelf: "center",
      rounded: "lg",
      paddingInline: 4,
      paddingBlock: 8,
    })}
  >
    <article className={grid({ columns: { base: 1, lg: 2 }, gap: 8 })}>
      <ViewTransition name={`model-image-${sanitiseName(slug)}`}>
        <figure
          className={css({
            position: "relative",
            aspectRatio: "square",
            rounded: "lg",
            shadow: "lg",
            contain: "content",
          })}
        >
          <Image
            alt={description}
            className={css({ objectFit: "cover" })}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            src={placeholderImg}
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
              marginBlockEnd: 6,
              fontWeight: "bold",
              fontSize: "4xl",
            })}
          >
            {name}
          </h1>
        </ViewTransition>

        <Pill
          className={gridItem({
            marginBlockEnd: 6,
            inlineSize: "fit-content",
            alignSelf: "center",
          })}
        >
          {categorySlug}
        </Pill>
        <div
          className={cx(
            css({ maxInlineSize: "none", marginBlockEnd: 6 }),
            prose({ size: "lg" }),
          )}
        >
          <p className={css({ color: "gray.700", lineHeight: "relaxed" })}>
            {description}
          </p>
        </div>

        <footer className={css({ color: "gray.500", fontSize: "sm" })}>
          <time dateTime={dateAdded.toISOString()}>
            Added on {dateAdded.toLocaleDateString()}
          </time>
        </footer>
      </section>
    </article>
  </div>
);

export { ModelDetail };
