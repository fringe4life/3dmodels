import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";
import { HeartButtonSkeleton } from "@/features/models/likes/components/heart-button-skeleton";
import { MOST_LIKED_LIMIT } from "@/features/models/queries/get-most-liked-models";
import {
  cardContainerClassName,
  cardSurfaceClassName,
  categoryClassName,
  copyClassName,
  descriptionClassName,
  likeRowClassName,
  listClassName,
  mediaClassName,
  metaClassName,
  titleClassName,
} from "./most-liked.styles";

const SKELETON_SLOTS = Array.from(
  { length: MOST_LIKED_LIMIT },
  (_, index) => `most-liked-slot-${index}`,
);

/** Matches the card's own grid, so the cached row swaps in without moving. */
const MostLikedSkeletonCard = () => (
  <li aria-hidden="true" className={cardContainerClassName}>
    <div className={cardSurfaceClassName}>
      <Skeleton className={mediaClassName} color={token("colors.bg.muted")} />

      <div className={copyClassName}>
        <div className={titleClassName}>
          <Skeleton
            className={css({ blockSize: 4, inlineSize: "3/4", rounded: "sm" })}
            color={token("colors.bg.muted")}
          />
        </div>

        <div className={descriptionClassName}>
          <div className={css({ spaceY: 2 })}>
            <Skeleton
              className={css({
                blockSize: 3,
                inlineSize: "full",
                rounded: "sm",
              })}
              color={token("colors.bg.muted")}
            />
            <Skeleton
              className={css({
                blockSize: 3,
                inlineSize: "5/6",
                rounded: "sm",
              })}
              color={token("colors.bg.muted")}
            />
          </div>
        </div>

        <div className={metaClassName}>
          <div className={categoryClassName}>
            <Skeleton
              className={css({ blockSize: 7, inlineSize: 20, rounded: "full" })}
              color={token("colors.bg.muted")}
            />
          </div>
          <div className={likeRowClassName}>
            <HeartButtonSkeleton />
          </div>
        </div>
      </div>
    </div>
  </li>
);

const MostLikedSkeleton = () => (
  <ul className={listClassName}>
    {SKELETON_SLOTS.map((slot) => (
      <MostLikedSkeletonCard key={slot} />
    ))}
  </ul>
);

export { MostLikedSkeleton };
