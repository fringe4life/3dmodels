import { css, cx, viewTransition } from "@styled-system/css";
import { hoverShadow, hstack } from "@styled-system/patterns";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import placeholderImg from "@/assets/images/placeholder.png";
import { Pill } from "@/components/pill";
import type { IsAuthenticated } from "@/features/auth/types";
import { toggleLike } from "@/features/models/likes/actions/toggle-like";
import { HeartButtonClient } from "@/features/models/likes/components/heart-button-client";
import type { Prettify } from "@/types";
import { sanitiseName } from "@/utils/sanitise-name";
import type { ModelWithLikeStatus } from "../types";

type ModelCardProps = Prettify<
  IsAuthenticated & {
    href: Route;
    model: ModelWithLikeStatus;
    priority?: boolean;
  }
>;

const modelCardEnter = viewTransition({
  new: {
    _only: {
      "--slide-distance": "-20px",
      animationDuration: "slow",
      animationName: "fade-in, slide-in",
    },
  },
});

const modelCardExit = viewTransition({
  old: {
    _only: {
      "--slide-distance": "20px",
      animationDuration: "slow",
      animationName: "fade-out, slide-out",
    },
  },
});

const ModelCard = ({
  href,
  isAuthenticated,
  model: { slug, name, description, image, categorySlug, likes, hasLiked },
  priority,
}: ModelCardProps) => (
  <ViewTransition enter={modelCardEnter} exit={modelCardExit}>
    <article
      className={cx(
        css({
          _hover: {
            translate: "0 calc(token(sizes.2) * -1)",
          },
          _notSupportsHover: {
            _supportsScroll: {
              animationDuration: "auto",
              animationFillMode: "forwards",
              animationName: "animateModelIn, animateModelOut",
              animationRange: "entry, exit 50%",
              animationTimeline: "view()",
              animationTimingFunction: "glide",
            },
          },
          "&:has([data-progress='true']) *": {
            cursor: "progress",
          },
          backgroundColor: "bg.surface",
          cursor: "pointer",
          isolation: "isolate",
          position: "relative",
          rounded: "lg",
          shadow: "md",
          transitionDuration: "normal",
          transitionProperty: "translate",
          transitionTimingFunction: {
            _supportsLinear: "glide",
            base: "ease-in-out",
          },
        }),
        hoverShadow({ shadow: "xl" }),
      )}
    >
      <ViewTransition name={`model-image-${sanitiseName(slug)}`}>
        <div
          className={css({
            aspectRatio: "square",
            contain: "strict",
            position: "relative",
            roundedTop: "inherit",
          })}
        >
          <Image
            alt={name ?? ""}
            className={css({ objectFit: "cover" })}
            fill
            priority={priority}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 250px"
            src={image || placeholderImg}
          />
        </div>
      </ViewTransition>

      <div className={css({ padding: 4 })}>
        <div
          className={css({
            marginBlockEnd: 2,
            minBlockSize: 14,
          })}
        >
          <ViewTransition name={`model-title-${sanitiseName(slug)}`}>
            <h2
              className={css({
                color: "gray.800",
                fontSize: "xl",
                fontWeight: "semibold",
                lineClamp: 2,
              })}
            >
              <Link href={href}>
                {name}
                <span
                  className={css({
                    blockSize: "full",
                    inlineSize: "full",
                    inset: 0,
                    position: "absolute",
                    z: "20",
                  })}
                />
              </Link>
            </h2>
          </ViewTransition>
        </div>
        <p
          className={css({
            color: "gray.800",
            fontSize: "sm",
            lineClamp: 2,
            minBlockSize: "10",
          })}
        >
          {description}
        </p>
        <div className={css({ marginBlockStart: 2 })}>
          <Pill>{categorySlug}</Pill>
        </div>
        <div
          className={hstack({
            color: "gray.600",
            marginBlockStart: 2,
            position: "relative",
            z: "50",
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
