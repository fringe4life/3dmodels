import { css } from "@styled-system/css";
import { Skeleton } from "@/components/skeleton";
import { HeartButtonSkeleton } from "@/features/models/likes/components/heart-button-skeleton";

const ModelCardSkeleton = () => (
  <Skeleton
    className={css({
      backgroundColor: "bg.surface",
      rounded: "lg",
      shadow: "md",
    })}
  >
    {/* Image skeleton - aspect-square matching the actual card */}
    <div
      className={css({
        aspectRatio: "square",
        backgroundColor: "bg.muted",
        roundedTop: "inherit",
      })}
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
        <div
          className={css({
            backgroundColor: "bg.muted",
            blockSize: 5,
            inlineSize: "3/4",
            rounded: "sm",
          })}
        />
      </div>

      {/* Description skeleton - min-block-10 with 2 lines */}
      <div className={css({ minBlockSize: 10, spaceY: 2 })}>
        <div
          className={css({
            backgroundColor: "bg.muted",
            blockSize: 4,
            inlineSize: "full",
            rounded: "sm",
          })}
        />
        <div
          className={css({
            backgroundColor: "bg.muted",
            blockSize: 4,
            inlineSize: "5/6",
            rounded: "sm",
          })}
        />
      </div>

      {/* Category pill skeleton */}
      <div className={css({ marginBlockStart: 2 })}>
        <div
          className={css({
            backgroundColor: "bg.muted",
            blockSize: 7,
            inlineSize: 20,
            marginBlockEnd: 2,
            rounded: "full",
          })}
        />
        {/* Heart button skeleton */}
        <HeartButtonSkeleton />
      </div>
    </div>
  </Skeleton>
);

export { ModelCardSkeleton };
