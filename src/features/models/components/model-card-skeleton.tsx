import { css } from "@styled-system/css";
import { Skeleton } from "@/components/skeleton";
import { HeartButtonSkeleton } from "@/features/models/likes/components/heart-button-skeleton";

const ModelCardSkeleton = () => (
  <Skeleton
    className={css({
      rounded: "lg",
      backgroundColor: "bg.surface",
      shadow: "md",
    })}
  >
    {/* Image skeleton - aspect-square matching the actual card */}
    <div
      className={css({
        aspectRatio: "square",
        roundedTop: "inherit",
        backgroundColor: "bg.muted",
      })}
    />

    {/* Content section with same padding as model-card */}
    <div className={css({ paddingInline: 4, paddingBlock: 4 })}>
      {/* Title skeleton - min-block-14 with 2 lines */}
      <div
        className={css({
          marginBlockEnd: 2,
          minBlockSize: 14,
          spaceY: 2,
        })}
      >
        <div
          className={css({
            blockSize: 5,
            inlineSize: "3/4",
            rounded: "sm",
            backgroundColor: "bg.muted",
          })}
        />
      </div>

      {/* Description skeleton - min-block-10 with 2 lines */}
      <div className={css({ minBlockSize: 10, spaceY: 2 })}>
        <div
          className={css({
            blockSize: 4,
            inlineSize: "full",
            rounded: "sm",
            backgroundColor: "bg.muted",
          })}
        />
        <div
          className={css({
            blockSize: 4,
            inlineSize: "5/6",
            rounded: "sm",
            backgroundColor: "bg.muted",
          })}
        />
      </div>

      {/* Category pill skeleton */}
      <div className={css({ marginBlockStart: 2 })}>
        <div
          className={css({
            blockSize: 7,
            inlineSize: 20,
            rounded: "full",
            backgroundColor: "bg.muted",
            marginBlockEnd: 2,
          })}
        />
        {/* Heart button skeleton */}
        <HeartButtonSkeleton />
      </div>
    </div>
  </Skeleton>
);

export { ModelCardSkeleton };
