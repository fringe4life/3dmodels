import { ViewTransition } from "react";
import type { Children } from "@/types";

const SearchInputTransition = ({ children }: Children) => (
  <ViewTransition
    enter={{
      "search-clear": "search-spinner-quick",
      "search-submit": "search-spinner-quick",
      "search-debounce": "search-spinner-standard",
      default: "auto",
    }}
    exit={{
      "search-clear": "search-spinner-quick",
      "search-submit": "search-spinner-quick",
      "search-debounce": "search-spinner-standard",
      default: "auto",
    }}
    name="search-input-spinner"
  >
    {children}
  </ViewTransition>
);

export { SearchInputTransition };
