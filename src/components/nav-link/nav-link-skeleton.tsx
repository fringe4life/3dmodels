import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";
import type { BorderPosition } from "./types";

interface NavLinkSkeletonProps extends Partial<BorderPosition> {
  ch: number;
  className?: string;
  variant?: "icon" | "text";
}

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
            size: 9,
            rounded: "sm",
            backgroundColor: "bg.muted",
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
          display: "inline-block",
          fontSize: "sm",
          fontWeight: "medium",
          inlineSize: `${ch}ch`,
          blockSize: "1.25em",
          rounded: "sm",
          backgroundColor: "bg.muted",
          verticalAlign: "middle",
          ...(borderPosition === "bottom" && { paddingBlock: "2" }),
        }),
        className,
      )}
    />
  );
};

export { NavLinkSkeleton };
