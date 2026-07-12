import { square } from "@styled-system/patterns";
import type { MouseEventHandler } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
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
      disabled={hasPreviousPage}
      onClick={onPreviousPage}
    >
      <FaChevronLeft aria-hidden className={square({ size: 6 })} />
    </PaginationButton>
    <PaginationButton
      aria-label="Next page"
      disabled={!hasNextPage}
      onClick={onNextPage}
    >
      <FaChevronRight aria-hidden className={square({ size: 6 })} />
    </PaginationButton>
  </>
);

export { PaginationPageControl };
