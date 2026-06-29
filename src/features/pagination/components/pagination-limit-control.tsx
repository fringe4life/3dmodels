"use client";
import { css } from "@styled-system/css";
import { useId } from "react";
import { LIMITS } from "@/features/pagination/constants";
import type { Limit, LimitItem } from "@/features/pagination/types";

interface PaginationLimitControlProps extends Limit {
  onLimitChange: (limit: LimitItem) => void;
}

const PaginationLimitControl = ({
  limit,
  onLimitChange,
}: PaginationLimitControlProps) => {
  const id = useId();
  return (
    <select
      className={css({ inlineSize: 10, blockSize: 8 })}
      id={id}
      onChange={(event) =>
        onLimitChange(Number(event.target.value) as LimitItem)
      }
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
