import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";
import { HeartButtonSkeleton } from "@/features/models/likes/components/heart-button-skeleton";

const ModelCardSkeleton = () => (
  <div
    aria-hidden="true"
    className={css({
      backgroundColor: "bg.surface",
      rounded: "lg",
      shadow: "md",
    })}
  >
    {/* Image skeleton - aspect-square matching the actual card */}
    <Skeleton
      className={css({
        aspectRatio: "square",
        roundedTop: "inherit",
      })}
      color={token("colors.bg.muted")}
    />

    {/* Content section with same padding as model-card */}
    <div className={css({ paddingBlock: 4, paddingInline: 4 })}>
      {/* Title skeleton - min-block-14 with 2 lines */}
      <div
        className={css({
          marginBlockEnd: 2,
          minBlockSize: 14,
          spaceY: 2,
        })}
      >
        <Skeleton
          className={css({
            blockSize: 5,
            inlineSize: "3/4",
            rounded: "sm",
          })}
          color={token("colors.bg.muted")}
        />
      </div>

      {/* Description skeleton - min-block-10 with 2 lines */}
      <div className={css({ minBlockSize: 10, spaceY: 2 })}>
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

      {/* Category pill skeleton */}
      <div className={css({ marginBlockStart: 2 })}>
        <Skeleton
          className={css({
            blockSize: 7,
            inlineSize: 20,
            marginBlockEnd: 2,
            rounded: "full",
          })}
          color={token("colors.bg.muted")}
        />
        {/* Heart button skeleton */}
        <HeartButtonSkeleton />
      </div>
    </div>
  </div>
);

export { ModelCardSkeleton };
