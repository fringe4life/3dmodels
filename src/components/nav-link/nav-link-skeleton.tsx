/** biome-ignore-all lint/suspicious/noUnnecessaryConditions: this rule is bugged */
import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { token } from "@styled-system/tokens";
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
  switch (variant) {
    case "icon":
      return (
        <Skeleton
          className={cx(
            square({
              rounded: "sm",
              size: 9,
            }),
            className,
          )}
          color={token("colors.bg.muted")}
        />
      );
    case "text":
      return (
        <Skeleton
          className={cx(
            css({
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
          color={token("colors.bg.muted")}
        />
      );
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }
};

export { NavLinkSkeleton };
