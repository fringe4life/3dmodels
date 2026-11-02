import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pill } from "@/components/pill";
import { modelDetailHref } from "@/features/models/back-link/from-search-params";
import { toggleLike } from "@/features/models/likes/actions/toggle-like";
import { HeartButtonClient } from "@/features/models/likes/components/heart-button-client";
import type { ModelWithLikeStatus } from "@/features/models/types";
import type { IsAuthenticated } from "@/lib/auth/types";
import { PLACEHOLDER_IMAGE_SRC } from "@/lib/placeholder-image";
import type { Prettify } from "@/types";
import {
  cardContainerClassName,
  cardSurfaceClassName,
  categoryClassName,
  copyClassName,
  descriptionClassName,
  imageClassName,
  likeRowClassName,
  linkOverlayClassName,
  MOST_LIKED_IMAGE_SIZES,
  mediaClassName,
  metaClassName,
  titleClassName,
  titleLinkClassName,
} from "./most-liked.styles";

type MostLikedCardProps = Prettify<
  IsAuthenticated & {
    model: ModelWithLikeStatus;
    returnTo: Route;
  }
>;

/**
 * Ranked row card — the catalogue card's anatomy on its own container, so it
 * splits into thumb + copy while it has room and stacks when it does not.
 * Rank is carried by order and the like count; no numeral is drawn.
 */
const MostLikedCard = ({
  isAuthenticated,
  model: {
    categoryDisplayName,
    description,
    hasLiked,
    image,
    likes,
    name,
    slug,
  },
  returnTo,
}: MostLikedCardProps) => (
  <li className={cardContainerClassName}>
    <article className={cardSurfaceClassName}>
      <div className={mediaClassName}>
        <Image
          alt={name}
          className={imageClassName}
          fill
          sizes={MOST_LIKED_IMAGE_SIZES}
          src={image || PLACEHOLDER_IMAGE_SRC}
        />
      </div>
      <div className={copyClassName}>
        <h3 className={titleClassName}>
          <Link
            className={titleLinkClassName}
            href={modelDetailHref(slug, returnTo)}
          >
            {name}
            <span className={linkOverlayClassName} />
          </Link>
        </h3>
        <p className={descriptionClassName}>{description}</p>
        <div className={metaClassName}>
          <div className={categoryClassName}>
            <Pill>{categoryDisplayName}</Pill>
          </div>
          <div className={likeRowClassName}>
            <HeartButtonClient
              hasLiked={hasLiked}
              isAuthenticated={isAuthenticated}
              likes={likes}
              slug={slug}
              toggleAction={toggleLike}
            />
          </div>
        </div>
      </div>
    </article>
  </li>
);

export { MostLikedCard };
