import { skeletonEnter } from "@/app/styles";
import { css, cx } from "../../../../styled-system/css";
import { HeartButtonSkeleton } from "./heart-button/heart-button-skeleton";

const ModelCardSkeleton = () => (
  <article
    className={cx(
      skeletonEnter,
      css({
        animation: "pulse",
        rounded: "lg",
        backgroundColor: "white",
        shadow: "md",
      }),
    )}
  >
    {/* Image skeleton - aspect-square matching the actual card */}
    <div
      className={css({
        aspectRatio: "square",
        roundedTop: "inherit",
        backgroundColor: "gray.200",
      })}
    />

    {/* Content section with same padding as model-card */}
    <div className={css({ paddingInline: "4", paddingBlock: "4" })}>
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
            backgroundColor: "gray.200",
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
            backgroundColor: "gray.200",
          })}
        />
        <div
          className={css({
            blockSize: 4,
            inlineSize: "5/6",
            rounded: "sm",
            backgroundColor: "gray.200",
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
            backgroundColor: "gray.200",
            marginBlockEnd: 2,
          })}
        />
        {/* Heart button skeleton */}
        <HeartButtonSkeleton />
      </div>
    </div>
  </article>
);

export { ModelCardSkeleton };
