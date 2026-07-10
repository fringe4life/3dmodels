"use client";

import { css } from "@styled-system/css";
import { Button } from "@/components/button";
import { toSort } from "@/features/models/sort/brands";
import { SORT_LABELS, SORT_VALUES } from "@/features/models/sort/constants";
import { useSortQuery } from "@/features/models/sort/hooks/use-sort-query";

const ModelsSortControls = () => {
  const { handleSortChange, isPending, sort } = useSortQuery();

  return (
    <div
      aria-label="Sort models"
      className={css({
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      })}
      role="radiogroup"
    >
      {SORT_VALUES.map((value) => {
        const option = toSort(value);
        const isActive = option === sort;

        const handleClick = () => handleSortChange(option);

        return (
          <Button
            aria-checked={isActive}
            disabled={isPending}
            key={value}
            onClick={handleClick}
            role="radio"
            size="pill"
            type="button"
            variant={isActive ? "primary" : "outline"}
          >
            {SORT_LABELS[value]}
          </Button>
        );
      })}
    </div>
  );
};

export { ModelsSortControls };
