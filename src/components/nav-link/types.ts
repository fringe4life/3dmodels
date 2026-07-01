import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

type BorderPositionUnion = "bottom" | "left";
type MatchStrategyUnion = "includes" | "endsWith";

export interface MatchStrategy {
  matchStrategy: MatchStrategyUnion;
}

export interface BorderPosition {
  borderPosition: BorderPositionUnion;
}

/** Same surface as `next/link` (including `transitionTypes`) plus nav options; `href` uses typed routes. */
export type NextLinkComponentProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps;
