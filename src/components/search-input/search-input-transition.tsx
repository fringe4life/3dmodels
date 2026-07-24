import { viewTransition } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Children } from "@/types";

const searchSpinnerQuick = viewTransition({
  new: {
    animation: "fade-in 100ms ease-out",
  },
  old: {
    animation: "fade-out 100ms ease-out",
  },
});

const searchSpinnerStandard = viewTransition({
  new: {
    animation: "fade-in 200ms ease-out",
  },
  old: {
    animation: "fade-out 200ms ease-out",
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
