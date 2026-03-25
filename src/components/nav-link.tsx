"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLinkListItemProps, NavLinkProps } from "@/types";

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
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    matchStrategy === "endsWith"
      ? pathname.endsWith(href)
      : pathname.includes(href);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={clsx("nav-link", className)}
      {...(borderPosition === "bottom" && { "data-border-bottom": true })}
      href={href}
      prefetch
    >
      {children}
    </Link>
  );
};

const NavLinkListItem = ({
  liClassName = "text-sm uppercase sm:tracking-wide",
  ...navLinkProps
}: NavLinkListItemProps) => (
  <li className={liClassName}>
    <NavLink {...navLinkProps} />
  </li>
);

export { NavLink, NavLinkListItem };
