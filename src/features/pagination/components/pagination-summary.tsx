import { css } from "@styled-system/css";
import type { Count, Limit, Page } from "@/features/pagination/types";

interface PaginationSummaryProps extends Count, Page, Limit {}

const PaginationSummary = ({ count, limit, page }: PaginationSummaryProps) => {
  const startOffset = page * limit + 1;
  const endOffset = startOffset - 1 + limit;
  const actualEndOffset = Math.min(endOffset, count);
  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  return (
    <p className={css({ color: "text.muted", fontSize: "sm" })}>{label}</p>
  );
};

export { PaginationSummary };
