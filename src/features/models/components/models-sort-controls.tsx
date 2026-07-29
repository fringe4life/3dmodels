"use client";

import { css } from "@styled-system/css";
import { wrap } from "@styled-system/patterns";
import type { ChangeEventHandler } from "react";
import { isSortList, toSort } from "@/features/models/sort/brands";
import { SortOption } from "@/features/models/sort/components/sort-option";
import { SORT_LABELS, SORT_VALUES } from "@/features/models/sort/constants";
import { useSortQuery } from "@/features/models/sort/hooks/use-sort-query";

const ModelsSortControls = () => {
  const { handleSortChange, isPending, sort } = useSortQuery();

  const handleRadioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (isSortList(value)) {
      handleSortChange(toSort(value));
    }
  };

  return (
    <fieldset
      aria-busy={isPending}
      className={wrap({
        border: "none",
        gap: 2,
        margin: 0,
        minInlineSize: 0,
        opacity: { _disabled: "0.5" },
        padding: 0,
      })}
      disabled={isPending}
    >
      <legend className={css({ srOnly: true })}>Sort models</legend>
      {SORT_VALUES.map((value) => (
        <SortOption
          checked={toSort(value) === sort}
          key={value}
          label={SORT_LABELS[value]}
          onChange={handleRadioChange}
          value={value}
        />
      ))}
    </fieldset>
  );
};

export { ModelsSortControls };
