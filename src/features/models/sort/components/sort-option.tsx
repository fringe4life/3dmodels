import { css, cx } from "@styled-system/css";
import type { Route } from "next";
import Link from "next/link";
import { buttonRecipe } from "@/components/button-recipe";
import type { SortList } from "@/features/models/sort/constants";

interface SortOptionProps {
  href: Route;
  label: string;
  selected: boolean;
  value: SortList;
}

const SortOption = ({ href, label, selected, value }: SortOptionProps) => (
  <Link
    aria-current={selected ? "true" : undefined}
    className={cx(
      buttonRecipe({
        size: "pill",
        variant: selected ? "primary" : "brandOutline",
      }),
      css({
        _focusVisible: {
          outline: "none",
          ring: 2,
          ringColor: "brand.ring",
          ringOffset: 2,
        },
      }),
    )}
    data-sort={value}
    href={href}
    replace
    scroll={false}
  >
    {label}
  </Link>
);

export { SortOption };
