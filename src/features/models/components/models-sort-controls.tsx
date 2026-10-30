"use client";

import { visuallyHidden, wrap } from "@styled-system/patterns";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { listingHref } from "@/features/models/listing/listing-serialize";
import { isSortList, toSort } from "@/features/models/sort/brands";
import { SortOption } from "@/features/models/sort/components/sort-option";
import {
  DEFAULT_SORT,
  SORT_LABELS,
  SORT_VALUES,
  type SortList,
} from "@/features/models/sort/constants";
import {
  useLocationSearch,
  useSyncSearchParamValue,
} from "@/hooks/use-sync-search-param";
import { resetPager } from "@/lib/listing-url";

const ModelsSortControls = () => {
  const pathname = usePathname();
  const search = useLocationSearch();
  const [sort, setSort] = useState<SortList>(DEFAULT_SORT);

  const syncSort = useCallback((value: string | null) => {
    setSort(value && isSortList(value) ? toSort(value) : DEFAULT_SORT);
  }, []);

  useSyncSearchParamValue("sort", syncSort);

  const base = `${pathname}${search}`;

  return (
    <fieldset
      className={wrap({
        border: "none",
        gap: 2,
        margin: 0,
        minInlineSize: 0,
        padding: 0,
      })}
    >
      <legend className={visuallyHidden()}>Sort models</legend>
      {SORT_VALUES.map((value) => (
        <SortOption
          href={listingHref(base, { sort: value, ...resetPager })}
          key={value}
          label={SORT_LABELS[value]}
          selected={toSort(value) === sort}
          value={value}
        />
      ))}
    </fieldset>
  );
};

export { ModelsSortControls };
