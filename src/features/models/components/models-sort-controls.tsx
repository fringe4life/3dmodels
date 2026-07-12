"use client";

import { css, cx } from "@styled-system/css";
import type { ChangeEventHandler } from "react";
import { buttonRecipe } from "@/components/button-recipe";
import { isSortList, toSort } from "@/features/models/sort/brands";
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
      className={css({
        border: "none",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        margin: 0,
        minInlineSize: 0,
        opacity: { _disabled: "0.5" },
        padding: 0,
      })}
      disabled={isPending}
    >
      <legend className={css({ srOnly: true })}>Sort models</legend>
      {SORT_VALUES.map((value) => {
        const isActive = toSort(value) === sort;

        return (
          <label
            className={cx(
              buttonRecipe({
                size: "pill",
                variant: isActive ? "primary" : "outline",
              }),
              css({
                _focusWithin: {
                  outline: "none",
                  ring: 2,
                  ringColor: "brand.ring",
                  ringOffset: 2,
                },
              }),
            )}
            key={value}
          >
            <input
              checked={isActive}
              className={css({ srOnly: true })}
              name="sort"
              onChange={handleRadioChange}
              type="radio"
              value={value}
            />
            {SORT_LABELS[value]}
          </label>
        );
      })}
    </fieldset>
  );
};

export { ModelsSortControls };
