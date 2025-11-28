"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: Route;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <li className="text-sm uppercase">
      <Link
        className={`nav-link ${isActive ? "active" : ""}`}
        data-border-bottom
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
