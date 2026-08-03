import { viewTransition } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";
import type { Page } from "../types";

type PaginationOffsetTransitionProps<T extends Page> = Prettify<
  Children & {
    metadata: T;
  }
>;

const enterLeft = viewTransition({
  new: {
    "--slide-distance": {
      base: "calc(-100vw - 60px)",
      md: "-60px",
    },
    animationDuration: "slow",
    animationName: "fade-in, slide-in",
  },
});

const enterRight = viewTransition({
  new: {
    "--slide-distance": {
      base: "calc(100vw + 60px)",
      md: "60px",
    },
    animationDuration: "slow",
    animationName: "fade-in, slide-in",
  },
});

const exitLeft = viewTransition({
  old: {
    "--slide-distance": {
      base: "calc(-100vw - 60px)",
      md: "-60px",
    },
    animation: "fade-out, slide-out",
    animationDuration: "slow",
  },
});

const exitRight = viewTransition({
  old: {
    "--slide-distance": {
      base: "calc(100vw + 60px)",
      md: "60px",
    },
    animation: "fade-out, slide-out",
    animationDuration: "slow",
  },
});

const PaginationOffsetTransition = <T extends Page>({
  children,
  metadata,
}: PaginationOffsetTransitionProps<T>) => (
  <ViewTransition
    enter={{
      backwards: enterLeft,
      default: "auto",
      forwards: enterRight,
    }}
    exit={{
      backwards: exitRight,
      default: "auto",
      forwards: exitLeft,
    }}
    key={`models-page-${metadata.page}`}
  >
    {children}
  </ViewTransition>
);

export { PaginationOffsetTransition };
