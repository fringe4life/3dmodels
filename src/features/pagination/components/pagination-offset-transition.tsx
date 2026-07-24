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
    "--slide-distance": "-60px",
    animation: "fade-in 250ms, slide-in 250ms",
  },
});

const enterRight = viewTransition({
  new: {
    "--slide-distance": "calc(100vw + 60px)",
    animation: "fade-in 250ms, slide-in 250ms",
  },
});

const exitLeft = viewTransition({
  old: {
    "--slide-distance": "-60px",
    animation: "fade-out 250ms, slide-out 250ms",
  },
});

const exitRight = viewTransition({
  old: {
    "--slide-distance": "calc(100vw + 60px)",
    animation: "fade-out 250ms, slide-out 250ms",
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
