import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import { Skeleton } from "../skeleton";

const SearchInputSkeleton = () => (
  <Skeleton
    className={css({
      blockSize: "full",
      borderColor: "searchInput",
      borderWidth: 1,
      inlineSize: "full",
      rounded: "full",
    })}
    color={token("colors.gray.400/20")}
  />
);

export { SearchInputSkeleton };
