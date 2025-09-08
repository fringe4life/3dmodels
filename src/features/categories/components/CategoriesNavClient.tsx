"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/db/schema";

interface CategoriesNavClientProps {
  categories: Category[];
}

export default function CategoriesNavClient({
  categories,
}: CategoriesNavClientProps) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/3d-models"
        className={`nav-link ${pathname === "/3d-models" ? "active" : ""}`}
      >
        All
      </Link>
      {categories.map((item) => (
        <Link
          key={item.slug}
          href={`/3d-models/categories/${item.slug}` as Route}
          className={`nav-link ${pathname === `/3d-models/categories/${item.slug}` ? "active" : ""}`}
        >
          {item.displayName}
        </Link>
      ))}
    </>
  );
}
