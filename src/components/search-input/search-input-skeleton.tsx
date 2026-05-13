import { skeletonEnter } from "@/app/styles";
import { css, cx } from "../../../styled-system/css";
import { Skeleton } from "../skeleton";

// "skeleton-enter block-full inline-full animate-pulse rounded-full border border-search-input bg-gray-400/20" />
const SearchInputSkeleton = () => (
  <Skeleton
    className={cx(
      css({
        blockSize: "full",
        inlineSize: "full",
        rounded: "full",
        borderColor: "searchInput",
        backgroundColor: "gray.400/20",
      }),
      skeletonEnter,
    )}
  />
);

export { SearchInputSkeleton };
