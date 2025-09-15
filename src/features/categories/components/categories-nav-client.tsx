"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/db/schema";

type CategoriesNavClientProps = {
  categories: Category[];
};

export default function CategoriesNavClient({
  categories,
}: CategoriesNavClientProps) {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={`nav-link ${pathname === "/3d-models" ? "active" : ""}`}
        href="/3d-models"
      >
        All
      </Link>
      {categories.map((item) => (
        <Link
          className={`nav-link ${pathname === `/3d-models/categories/${item.slug}` ? "active" : ""}`}
          href={`/3d-models/categories/${item.slug}` as Route}
          key={item.slug}
        >
          {item.displayName}
        </Link>
      ))}
    </>
  );
}
