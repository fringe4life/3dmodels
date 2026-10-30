import { cx } from "@styled-system/css";
import type { Route } from "next";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";
import { buttonRecipe } from "@/components/button-recipe";
import type { HasNextPage, HasPreviousPage } from "@/lib/pagination/types";
import type { Prettify } from "@/types";
import { PaginationButton } from "./pagination-button";

type PaginationPageControlProps = Prettify<
  HasNextPage &
    HasPreviousPage & {
      nextHref: Route | null;
      previousHref: Route | null;
    }
>;

const pagerLinkClassName = cx(
  "group",
  buttonRecipe({ size: "icon", variant: "ghost" }),
);

const PaginationPageControl = ({
  hasNextPage,
  hasPreviousPage,
  nextHref,
  previousHref,
}: PaginationPageControlProps) => (
  <>
    {hasPreviousPage && previousHref ? (
      <Link
        aria-label="Previous page"
        className={pagerLinkClassName}
        href={previousHref}
        replace
        scroll={false}
        transitionTypes={["backwards"]}
      >
        <FaChevronLeft
          aria-hidden
          className={arrowRecipe({
            direction: "left",
            distance: "compact",
            size: "lg",
          })}
        />
      </Link>
    ) : (
      <PaginationButton aria-label="Previous page" disabled>
        <FaChevronLeft
          aria-hidden
          className={arrowRecipe({
            direction: "left",
            distance: "compact",
            size: "lg",
          })}
        />
      </PaginationButton>
    )}
    {hasNextPage && nextHref ? (
      <Link
        aria-label="Next page"
        className={pagerLinkClassName}
        href={nextHref}
        replace
        scroll={false}
        transitionTypes={["forwards"]}
      >
        <FaChevronRight
          aria-hidden
          className={arrowRecipe({
            direction: "right",
            distance: "compact",
            size: "lg",
          })}
        />
      </Link>
    ) : (
      <PaginationButton aria-label="Next page" disabled>
        <FaChevronRight
          aria-hidden
          className={arrowRecipe({
            direction: "right",
            distance: "compact",
            size: "lg",
          })}
        />
      </PaginationButton>
    )}
  </>
);

export { PaginationPageControl };
