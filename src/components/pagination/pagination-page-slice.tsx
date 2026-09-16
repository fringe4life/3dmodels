import { viewTransition } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Children } from "@/types";

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
    animationDuration: "slow",
    animationName: "fade-out, slide-out",
  },
});

const exitRight = viewTransition({
  old: {
    "--slide-distance": {
      base: "calc(100vw + 60px)",
      md: "60px",
    },
    animationDuration: "slow",
    animationName: "fade-out, slide-out",
  },
});

const PaginationPageSlice = ({ children }: Children) => (
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
  >
    {children}
  </ViewTransition>
);

export { PaginationPageSlice };
