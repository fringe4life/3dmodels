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
  const isActive = pathname === href;

  return (
    <li className="text-sm uppercase">
      <Link
        className={`cursor-pointer rounded-md px-4 py-2 transition-colors hover:text-orange-accent ${isActive ? "text-orange-accent" : "text-gray-700"}`}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
