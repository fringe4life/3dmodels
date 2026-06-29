import { square } from "@styled-system/patterns";
import type { MouseEventHandler } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PaginationButton } from "./pagination-button";

interface PaginationPageControlProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: MouseEventHandler<HTMLButtonElement>;
  onPreviousPage: MouseEventHandler<HTMLButtonElement>;
}

const PaginationPageControl = ({
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
}: PaginationPageControlProps) => (
  <>
    <PaginationButton disabled={hasPreviousPage} onClick={onPreviousPage}>
      <FaChevronLeft className={square({ size: 6 })} />
    </PaginationButton>
    <PaginationButton disabled={!hasNextPage} onClick={onNextPage}>
      <FaChevronRight className={square({ size: 6 })} />
    </PaginationButton>
  </>
);

export { PaginationPageControl };
