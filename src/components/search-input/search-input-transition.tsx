import { ViewTransition } from "react";

const SearchInputTransition = ({ children }: { children: React.ReactNode }) => (
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
