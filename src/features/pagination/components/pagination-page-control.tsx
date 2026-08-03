import type { MouseEventHandler } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";
import type { Prettify } from "@/types";
import type { HasNextPage, HasPreviousPage } from "../types";
import { PaginationButton } from "./pagination-button";

type PaginationPageControlProps = Prettify<
  HasNextPage &
    HasPreviousPage & {
      onNextPage: MouseEventHandler<HTMLButtonElement>;
      onPreviousPage: MouseEventHandler<HTMLButtonElement>;
    }
>;

const PaginationPageControl = ({
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
}: PaginationPageControlProps) => (
  <>
    <PaginationButton
      aria-label="Previous page"
      disabled={!hasPreviousPage}
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
      disabled={!hasNextPage}
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
