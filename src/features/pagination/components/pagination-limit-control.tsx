"use client";
import { css } from "@styled-system/css";
import { type ChangeEvent, useId } from "react";
import { LIMITS } from "@/features/pagination/constants";
import type { Limit, LimitItem } from "@/features/pagination/types";
import type { Prettify } from "@/types";

type PaginationLimitControlProps = Prettify<
  Limit & {
    onLimitChange: (limit: LimitItem) => void;
  }
>;

const PaginationLimitControl = ({
  limit,
  onLimitChange,
}: PaginationLimitControlProps) => {
  const id = useId();
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(event.target.value) as LimitItem);
  };
  return (
    <select
      aria-label="Pagination limit control"
      className={css({ blockSize: 8, inlineSize: 10 })}
      id={id}
      onChange={handleChange}
      value={limit}
    >
      {LIMITS.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export { PaginationLimitControl };
