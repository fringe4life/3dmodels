import { viewTransition } from "@styled-system/css";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Pill } from "@/components/pill";
import type { IsAuthenticated } from "@/features/auth/types";
import { toggleLike } from "@/features/models/likes/actions/toggle-like";
import { HeartButtonClient } from "@/features/models/likes/components/heart-button-client";
import { PLACEHOLDER_IMAGE_SRC } from "@/lib/placeholder-image";
import type { Prettify } from "@/types";
import { sanitiseName } from "@/utils/sanitise-name";
import type { ModelWithLikeStatus } from "../types";
import {
  MODEL_CARD_IMAGE_SIZES,
  modelCardCategory,
  modelCardContainer,
  modelCardDescription,
  modelCardImage,
  modelCardLikeRow,
  modelCardLinkOverlay,
  modelCardMedia,
  modelCardMeta,
  modelCardSurface,
  modelCardTitle,
  modelCardTitleLink,
} from "./model-card.styles";

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
}: ModelCardProps) => {
  const transitionSlug = sanitiseName(slug);

  return (
    <ViewTransition enter={modelCardEnter} exit={modelCardExit}>
      <div className={modelCardContainer}>
        <article className={modelCardSurface}>
          <ViewTransition name={`model-image-${transitionSlug}`}>
            <div className={modelCardMedia}>
              <Image
                alt={name}
                className={modelCardImage}
                fill
                priority={priority}
                sizes={MODEL_CARD_IMAGE_SIZES}
                src={image || PLACEHOLDER_IMAGE_SRC}
              />
            </div>
          </ViewTransition>

          <ViewTransition name={`model-title-${transitionSlug}`}>
            <h2 className={modelCardTitle}>
              <Link className={modelCardTitleLink} href={href}>
                {name}
                <span className={modelCardLinkOverlay} />
              </Link>
            </h2>
          </ViewTransition>
          <p className={modelCardDescription}>{description}</p>
          <div className={modelCardMeta}>
            <div className={modelCardCategory}>
              <Pill>{categorySlug}</Pill>
            </div>
            <div className={modelCardLikeRow}>
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
      </div>
    </ViewTransition>
  );
};

export { ModelCard };
