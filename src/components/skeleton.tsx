import { cva, cx } from "@styled-system/css";
import type { CssVarProperties } from "@styled-system/types";
import type { CSSProperties } from "react";
import { skeletonEnter } from "@/app/styles";
import type { Children, Prettify } from "@/types";

/** React `style` + Panda `--*` keys (partial overrides OK; recipe has fallbacks). */
type SkeletonStyle = CSSProperties & CssVarProperties;

/**
 * Shared Panda recipe for loading placeholders.
 * Runtime colors: Panda dynamic-styling pattern — `var(--x)` in recipe, set `--x` via `style`.
 * (No Astro-style `defineVars`; closest build-time API is `globalVars` for fixed globals.)
 */
const skeletonRecipe = cva({
  base: {
    animationDuration: "1.2s",
    animationIterationCount: "infinite",
    animationName: "skeletonShimmer",
    animationTimingFunction: "glide",
    backgroundColor: "var(--skeleton-color, token(colors.gray.300))",
    backgroundImage:
      "linear-gradient(90deg, var(--skeleton-color, token(colors.gray.300)) 25%, var(--skeleton-highlight, token(colors.gray.300)) 50%, var(--skeleton-color, token(colors.gray.300)) 75%)",
    backgroundPosition: "-200% 0",
    backgroundSize: "200% 100%",
  },
});

type SkeletonProps = Prettify<
  Partial<Children> & {
    className?: string;
    color?: string;
    highlightColor?: string;
  }
>;

const skeletonStyle = (
  color?: string,
  highlightColor?: string,
): SkeletonStyle => {
  const style: SkeletonStyle = {};
  if (color) {
    style["--skeleton-color"] = color;
  }
  if (highlightColor) {
    style["--skeleton-highlight"] = highlightColor;
  }
  return style;
};

const Skeleton = ({
  children,
  className,
  color,
  highlightColor,
}: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={cx(skeletonRecipe(), className, skeletonEnter)}
    style={skeletonStyle(color, highlightColor)}
  >
    {children}
  </div>
);

export { Skeleton };
