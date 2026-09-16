import type { MouseEventHandler } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";
import type { HasNextPage, HasPreviousPage } from "@/lib/pagination/types";
import type { Prettify } from "@/types";
import { PaginationButton } from "./pagination-button";

type PaginationPageControlProps = Prettify<
  HasNextPage &
    HasPreviousPage & {
      isPending: boolean;
      onNextPage: MouseEventHandler<HTMLButtonElement>;
      onPreviousPage: MouseEventHandler<HTMLButtonElement>;
    }
>;

const PaginationPageControl = ({
  hasNextPage,
  hasPreviousPage,
  isPending,
  onNextPage,
  onPreviousPage,
}: PaginationPageControlProps) => (
  <>
    <PaginationButton
      aria-label="Previous page"
      disabled={isPending || !hasPreviousPage}
      onClick={onPreviousPage}
    >
      <FaChevronLeft
        aria-hidden
        className={arrowRecipe({
          direction: "left",
          distance: "compact",
          size: "lg",
        })}
      />
    </PaginationButton>
    <PaginationButton
      aria-label="Next page"
      disabled={isPending || !hasNextPage}
      onClick={onNextPage}
    >
      <FaChevronRight
        aria-hidden
        className={arrowRecipe({
          direction: "right",
          distance: "compact",
          size: "lg",
        })}
      />
    </PaginationButton>
  </>
);

export { PaginationPageControl };
