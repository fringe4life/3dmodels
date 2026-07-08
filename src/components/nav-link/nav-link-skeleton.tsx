import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";
import type { Prettify } from "@/types";
import type { BorderPosition } from "./types";

type NavLinkSkeletonProps = Prettify<
  Partial<BorderPosition> & {
    ch: number;
    className?: string;
    variant?: "icon" | "text";
  }
>;

const NavLinkSkeleton = ({
  borderPosition = "bottom",
  ch,
  className,
  variant = "text",
}: NavLinkSkeletonProps) => {
  if (variant === "icon") {
    return (
      <Skeleton
        className={cx(
          square({
            backgroundColor: "bg.muted",
            rounded: "sm",
            size: 9,
          }),
          className,
        )}
      />
    );
  }

  return (
    <Skeleton
      className={cx(
        css({
          backgroundColor: "bg.muted",
          blockSize: "1.25em",
          display: "inline-block",
          fontSize: "sm",
          fontWeight: "medium",
          inlineSize: `${ch}ch`,
          rounded: "sm",
          verticalAlign: "middle",
          ...(borderPosition === "bottom" && { paddingBlock: "2" }),
        }),
        className,
      )}
    />
  );
};

export { NavLinkSkeleton };
