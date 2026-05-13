import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import { sanitiseName } from "@/utils/sanitise-name";
import { css, cx } from "../../../../styled-system/css";
import { flex, hoverShadow } from "../../../../styled-system/patterns";
import { toggleLike } from "../actions/likes";
import type { ModelCardProps } from "../types";
import { HeartButtonClient } from "./heart-button/heart-button-client";

const ModelCard = ({
  isAuthenticated,
  model: { slug, name, description, categorySlug, likes, hasLiked },
}: ModelCardProps) => (
  <ViewTransition enter="enter" exit="exit">
    <article
      className={cx(
        css({
          position: "relative",
          isolation: "isolate",
          rounded: "lg",
          backgroundColor: "bg.surface",
          shadow: "md",
          transitionProperty: "translate",
          transitionDuration: "normal",
          cursor: "pointer",
          transitionTimingFunction: {
            base: "ease-in-out",
            _supportsLinear: "glide",
          },
          _hover: {
            translate: "0 calc(token(sizes.2) * -1)",
          },
          _notSupportsHover: {
            _supportsScroll: {
              animationName: "animateModelIn, animateModelOut",
              animationDuration: "auto",
              animationTimingFunction: "glide",
              animationTimeline: "view()",
              animationFillMode: "forwards",
              animationRange: "entry, exit 50%",
            },
          },
          "&:has([data-progress='true']) *": {
            cursor: "progress",
          },
        }),
        hoverShadow({ shadow: "xl" }),
      )}
    >
      <ViewTransition name={`model-image-${sanitiseName(slug)}`}>
        <div
          className={css({
            position: "relative",
            aspectRatio: "square",
            roundedTop: "inherit",
            contain: "strict",
          })}
        >
          <Image
            alt={description}
            className={css({ objectFit: "cover" })}
            fill
            loading="eager"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            src={placeholderImg}
          />
        </div>
      </ViewTransition>

      <div className={css({ padding: 4 })}>
        <div
          className={flex({
            justify: "space-between",
            marginBlockEnd: 2,
            minBlockSize: 14,
          })}
        >
          <ViewTransition name={`model-title-${sanitiseName(slug)}`}>
            <h2
              className={css({
                lineClamp: 2,
                fontWeight: "semibold",
                color: "gray.800",
                fontSize: "xl",
              })}
            >
              <Link href={`/3d-models/${slug}`}>
                {name}
                <span
                  className={css({
                    position: "absolute",
                    inset: 0,
                    z: "20",
                    inlineSize: "full",
                    blockSize: "full",
                  })}
                />
              </Link>
            </h2>
          </ViewTransition>
        </div>
        <p
          className={css({
            minBlockSize: "10",
            lineClamp: 2,
            color: "gray.800",
            fontSize: "sm",
          })}
        >
          {description}
        </p>
        <div className={css({ marginBlockStart: 2 })}>
          <Pill>{categorySlug}</Pill>
        </div>
        <div
          className={flex({
            marginBlockStart: 2,
            position: "relative",
            z: "50",
            align: "center",
            color: "gray.600",
          })}
        >
          <HeartButtonClient
            hasLiked={hasLiked}
            isAuthenticated={isAuthenticated}
            likes={likes}
            slug={slug}
            toggleAction={toggleLike}
          />
        </div>
      </div>
    </article>
  </ViewTransition>
);

export { ModelCard };
