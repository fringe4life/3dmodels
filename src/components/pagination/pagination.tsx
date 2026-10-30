import { between, hstack } from "@styled-system/patterns";
import type { Route } from "next";
import { ViewTransition } from "react";
import type { LimitOption } from "@/components/pagination/pagination-limit-control";
import { PaginationLimitControl } from "@/components/pagination/pagination-limit-control";
import { PaginationPageControl } from "@/components/pagination/pagination-page-control";
import type { HasNextPage, HasPreviousPage } from "@/lib/pagination/types";
import type { Prettify } from "@/types";

type PaginationProps = Prettify<
  HasNextPage &
    HasPreviousPage & {
      currentLimit: LimitOption["value"];
      limitOptions: LimitOption[];
      nextHref: Route | null;
      previousHref: Route | null;
    }
>;

const Pagination = ({
  currentLimit,
  hasNextPage,
  hasPreviousPage,
  limitOptions,
  nextHref,
  previousHref,
}: PaginationProps) => (
  <ViewTransition name="pagination">
    <div className={between()}>
      <PaginationLimitControl
        currentLimit={currentLimit}
        options={limitOptions}
      />
      <div className={hstack({ columnGap: 2 })}>
        <PaginationPageControl
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextHref={nextHref}
          previousHref={previousHref}
        />
      </div>
    </div>
  </ViewTransition>
);

export { Pagination };
