import { css } from "@styled-system/css";
import type { Route } from "next";
import Link from "next/link";
import type { LIMITS } from "@/lib/pagination/constants";

const limitControlClass = css({
  _focusVisible: {
    outline: "none",
    ring: 2,
    ringColor: "brand.ring",
    ringOffset: 2,
  },
  alignItems: "center",
  backgroundColor: "bg.surface",
  borderColor: {
    _focusVisible: "brand",
    _hover: "border.strong",
    base: "border",
  },
  borderWidth: 1,
  color: "text.primary",
  display: "inline-flex",
  fontSize: "sm",
  fontVariantNumeric: "tabular-nums",
  gap: 1,
  paddingBlock: 1,
  paddingInline: 2,
  rounded: "md",
});

const limitOptionClass = css({
  _currentPage: {
    backgroundColor: "brand.subtle",
    fontWeight: "semibold",
  },
  color: "text.primary",
  paddingBlock: 1,
  paddingInline: 2,
  rounded: "sm",
  textDecoration: "none",
});

interface LimitOption {
  href: Route;
  value: (typeof LIMITS)[number];
}

interface PaginationLimitControlProps {
  currentLimit: (typeof LIMITS)[number];
  options: LimitOption[];
}

const PaginationLimitControl = ({
  currentLimit,
  options,
}: PaginationLimitControlProps) => (
  <nav aria-label="Pagination limit control" className={limitControlClass}>
    {options.map(({ href, value }) => (
      <Link
        aria-current={value === currentLimit ? "page" : undefined}
        className={limitOptionClass}
        href={href}
        key={value}
        replace
        scroll={false}
      >
        {value}
      </Link>
    ))}
  </nav>
);

export type { LimitOption, PaginationLimitControlProps };
export { PaginationLimitControl };
