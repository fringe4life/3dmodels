"use client";

import { css, cx } from "@styled-system/css";
import type { Route } from "next";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

/** Same surface as `next/link` (including `transitionTypes`) plus nav options; `href` uses typed routes. */
type NextLinkComponentProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps;

export type NavLinkProps = NextLinkComponentProps & {
  borderPosition?: "bottom" | "left";
  matchStrategy?: "includes" | "endsWith";
  href: Route;
};
/**
 * Client-side nav link that marks the current route with `aria-current="page"` and matching styles.
 *
 * **Matching caveats:** `matchStrategy: "includes"` uses substring checks on `pathname`, so more than
 * one link in the same list can appear current (invalid for assistive tech), or a link can match
 * unintentionally — e.g. `/3d-models/about` also contains `"/about"`, so a top-level `/about` item
 * can look active. Prefer `endsWith` when each `href` is a full path prefix, or tighten matching
 * later (e.g. path segments) if nav items are added or slugs can collide with other `href`s.
 */
const NavLink = ({
  href,
  children,
  matchStrategy = "includes",
  borderPosition = "bottom",
  className,
  prefetch = true,
  ...linkProps
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    matchStrategy === "endsWith"
      ? pathname.endsWith(href)
      : pathname.includes(href);

  return (
    <Link
      {...linkProps}
      aria-current={isActive ? "page" : undefined}
      className={cx(
        className,
        css({
          fontSize: "sm",
          fontWeight: "medium",
          color: {
            base: "black",
            _hover: "brand.muted !important",
          },
          transitionProperty:
            "color,background-color,border-color,text-decoration-color",
          transitionDuration: "normal",
          _currentPage: {
            color: "brand",
            fontWeight: "semibold",
            borderColor: "currentColor",
          },
          '&:not([data-border-bottom])[aria-current="page"]': {
            md: {
              borderInlineStartWidth: "2px",
              borderInlineStartStyle: "solid",
              paddingInlineStart: 3,
            },
          },
          "&[data-border-bottom]": {
            paddingBlock: "2",
          },
          '&[data-border-bottom][aria-current="page"]': {
            md: {
              borderBlockEndWidth: "2px",
              borderBlockEndStyle: "solid",
            },
          },
        }),
      )}
      {...(borderPosition === "bottom" && { "data-border-bottom": true })}
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
};

export { NavLink };
