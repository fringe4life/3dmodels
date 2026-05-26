import { css } from "@styled-system/css";
import { Skeleton } from "../skeleton";

const SearchInputSkeleton = () => (
  <Skeleton
    className={css({
      blockSize: "full",
      inlineSize: "full",
      rounded: "full",
      borderColor: "searchInput",
      borderWidth: 1,
      backgroundColor: "gray.400/20",
    })}
  />
);

export { SearchInputSkeleton };
