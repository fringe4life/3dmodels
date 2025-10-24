"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Stream from "@/components/streamable";

type NavLinkProps = {
  href: Route;
  children: ReactNode;
};

function NavLinkSkeleton() {
  return (
    <li className="text-sm uppercase">
      <div className="h-lh w-[20ch] animate-pulse rounded-md bg-gray-200" />
    </li>
  );
}

function NavLinkContent({ href, children }: NavLinkProps) {
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

export default function NavLink(props: NavLinkProps) {
  return (
    <Stream fallback={<NavLinkSkeleton />} value={null}>
      {() => <NavLinkContent {...props} />}
    </Stream>
  );
}
