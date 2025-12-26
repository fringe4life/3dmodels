"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLinkProps } from "@/types";

const NavLink = ({
  href,
  children,
  matchStrategy = "includes",
  borderPosition = "bottom",
  liClassName = "text-sm uppercase tracking-wide",
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    matchStrategy === "endsWith"
      ? pathname.endsWith(href)
      : pathname.includes(href);

  return (
    <li className={liClassName}>
      <Link
        className={`nav-link ${isActive ? "active" : ""}`}
        {...(borderPosition === "bottom" && { "data-border-bottom": true })}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
