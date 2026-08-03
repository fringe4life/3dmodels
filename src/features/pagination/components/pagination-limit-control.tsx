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
// newer customisable select has 2/3 browser support
// this is fine as this is portfolio project
// ideally ::picker(select) would also have appearance changed
// however postcss does not support ::picker(select) yet
const limitControlClass = css({
  _focusVisible: {
    outline: "none",
    ring: 2,
    ringColor: "brand.ring",
    ringOffset: 2,
  },
  "& option": {
    backgroundColor: "bg.surface",
    color: "text.primary",
    paddingBlock: 1,
    paddingInline: 2,
  },
  "& option::checkmark": {
    color: "brand",
    content: "✓",
    fontWeight: "bold",
  },
  "& option:checked": {
    backgroundColor: "brand.subtle",
  },
  "&::picker-icon": {
    color: "brand",
    transitionDuration: "normal",
    transitionProperty: "color,rotate",
    transitionTimingFunction: "ease-in-out",
  },
  "&::picker(select)": {
    backgroundColor: "bg.surface",
    borderColor: "border",
    borderWidth: 1,
    opacity: 0,
    padding: 1,
    rounded: "md",
    scale: "0.98",
    transformOrigin: "top",
    transitionBehavior: "allow-discrete",
    transitionDuration: "normal",
    transitionProperty: "opacity,scale",
    transitionTimingFunction: "outDramatic",
  },
  "&:is(:open,[open])::picker-icon": {
    rotate: "180deg",
  },
  "&:open::picker(select)": {
    opacity: 1,
    scale: "1",
  },
  appearance: "base-select",
  backgroundColor: "bg.surface",
  borderColor: {
    _focusVisible: "brand",
    _hover: "border.strong",
    base: "border",
  },
  borderWidth: 1,
  color: "text.primary",
  fontSize: "sm",
  fontVariantNumeric: "tabular-nums",
  inlineSize: 14,
  paddingBlock: 1,
  paddingInline: 2,
  rounded: "md",
  transitionDuration: "normal",
  transitionProperty: "colors,box-shadow",
  transitionTimingFunction: "ease-in-out",
});

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
      className={limitControlClass}
      id={id}
      onChange={handleChange}
      value={limit}
    >
      <button type="button">
        <selectedcontent
          // biome-ignore assist/source/useSortedKeys: starting style needs to be last usually
          className={css({
            transitionDuration: "normal",
            transitionProperty: "translate,opacity",
            transitionTimingFunction: "inDramatic",
            transitionBehavior: "allow-discrete",
            _starting: {
              opacity: 0,
              translate: "0 100%",
            },
          })}
          suppressHydrationWarning
        >
          {limit}
        </selectedcontent>
      </button>
      {LIMITS.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export { PaginationLimitControl };
