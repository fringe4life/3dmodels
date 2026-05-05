import { css } from "../../../styled-system/css";

// "skeleton-enter block-full inline-full animate-pulse rounded-full border border-search-input bg-gray-400/20" />
const SearchInputSkeleton = () => (
  <div
    className={css({
      blockSize: "full",
      inlineSize: "full",
      rounded: "full",
      borderColor: "searchInput",
      backgroundColor: "gray.400/20",
      animation: "pulse",
    })}
  />
);

export { SearchInputSkeleton };
