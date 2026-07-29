import { css, cx } from "@styled-system/css";
import type { ChangeEventHandler } from "react";
import { buttonRecipe } from "@/components/button-recipe";
import type { SortList } from "@/features/models/sort/constants";

interface SortOptionProps {
  checked: boolean;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: SortList;
}

const SortOption = ({ checked, label, onChange, value }: SortOptionProps) => (
  <label
    className={cx(
      buttonRecipe({
        size: "pill",
        variant: checked ? "primary" : "outline",
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
  >
    <input
      checked={checked}
      className={css({ srOnly: true })}
      name="sort"
      onChange={onChange}
      type="radio"
      value={value}
    />
    {label}
  </label>
);

export { SortOption };
