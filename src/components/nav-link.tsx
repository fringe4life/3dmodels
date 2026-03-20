"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLinkProps } from "@/types";

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
  liClassName = "text-sm uppercase sm:tracking-wide",
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    matchStrategy === "endsWith"
      ? pathname.endsWith(href)
      : pathname.includes(href);

  return (
    <li className={liClassName}>
      <Link
        aria-current={isActive ? "page" : undefined}
        className="nav-link"
        transitionTypes={[isActive ? "enter-block" : "exit-block"]}
        {...(borderPosition === "bottom" && { "data-border-bottom": true })}
        href={href}
        prefetch
      >
        {children}
      </Link>
    </li>
  );
};

export { NavLink };
