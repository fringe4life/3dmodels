import { css } from "@styled-system/css";
import { Skeleton } from "../skeleton";

const SearchInputSkeleton = () => (
  <Skeleton
    className={css({
      backgroundColor: "gray.400/20",
      blockSize: "full",
      borderColor: "searchInput",
      borderWidth: 1,
      inlineSize: "full",
      rounded: "full",
    })}
  />
);

export { SearchInputSkeleton };
