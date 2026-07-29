import { viewTransition } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Children } from "@/types";

const searchSpinnerQuick = viewTransition({
  group: {
    animationDuration: "fast",
  },
  new: {
    animationName: "fade-in",
    animationTimingFunction: "inDramatic",
  },
  old: {
    animationName: "fade-out",
    animationTimingFunction: "outDramatic",
  },
});

const searchSpinnerStandard = viewTransition({
  group: {
    animationDuration: "slow",
  },
  new: {
    animationName: "fade-in",
    animationTimingFunction: "inDramatic",
  },
  old: {
    animationName: "fade-out",
    animationTimingFunction: "outDramatic",
  },
});

const SearchInputTransition = ({ children }: Children) => (
  <ViewTransition
    enter={{
      default: "auto",
      "search-clear": searchSpinnerQuick,
      "search-debounce": searchSpinnerStandard,
      "search-submit": searchSpinnerQuick,
    }}
    exit={{
      default: "auto",
      "search-clear": searchSpinnerQuick,
      "search-debounce": searchSpinnerStandard,
      "search-submit": searchSpinnerQuick,
    }}
    name="search-input-spinner"
  >
    {children}
  </ViewTransition>
);

export { SearchInputTransition };
