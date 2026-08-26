import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";
import { HeartButtonSkeleton } from "@/features/models/likes/components/heart-button-skeleton";
import {
  modelCardCategory,
  modelCardContainer,
  modelCardDescription,
  modelCardLikeRow,
  modelCardMedia,
  modelCardMeta,
  modelCardSkeletonSurface,
  modelCardTitle,
} from "./model-card.styles";

const ModelCardSkeleton = () => (
  <div aria-hidden="true" className={modelCardContainer}>
    <div className={modelCardSkeletonSurface}>
      <Skeleton className={modelCardMedia} color={token("colors.bg.muted")} />

      <div className={modelCardTitle}>
        <Skeleton
          className={css({
            blockSize: 5,
            inlineSize: "3/4",
            rounded: "sm",
          })}
          color={token("colors.bg.muted")}
        />
      </div>

      <div className={modelCardDescription}>
        <div className={css({ spaceY: 2 })}>
          <Skeleton
            className={css({
              blockSize: 4,
              inlineSize: "full",
              rounded: "sm",
            })}
            color={token("colors.bg.muted")}
          />
          <Skeleton
            className={css({
              blockSize: 4,
              inlineSize: "5/6",
              rounded: "sm",
            })}
            color={token("colors.bg.muted")}
          />
        </div>
      </div>

      <div className={modelCardMeta}>
        <div className={modelCardCategory}>
          <Skeleton
            className={css({
              blockSize: 7,
              inlineSize: 20,
              rounded: "full",
            })}
            color={token("colors.bg.muted")}
          />
        </div>

        <div className={modelCardLikeRow}>
          <HeartButtonSkeleton />
        </div>
      </div>
    </div>
  </div>
);

export { ModelCardSkeleton };
