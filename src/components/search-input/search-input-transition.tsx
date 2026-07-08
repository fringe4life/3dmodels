import { ViewTransition } from "react";
import type { Children } from "@/types";

const SearchInputTransition = ({ children }: Children) => (
  <ViewTransition
    enter={{
      default: "auto",
      "search-clear": "search-spinner-quick",
      "search-debounce": "search-spinner-standard",
      "search-submit": "search-spinner-quick",
    }}
    exit={{
      default: "auto",
      "search-clear": "search-spinner-quick",
      "search-debounce": "search-spinner-standard",
      "search-submit": "search-spinner-quick",
    }}
    name="search-input-spinner"
  >
    {children}
  </ViewTransition>
);

export { SearchInputTransition };
