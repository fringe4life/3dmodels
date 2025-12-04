"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import GenericComponent from "@/components/generic-component";
import type { Category } from "@/db/schema/models";

type CategoriesNavClientProps = {
  categories: Category[];
};

const CategoriesNavClient = ({ categories }: CategoriesNavClientProps) => {
  const pathname = usePathname();
  const allId = useId();
  const allCategories = [
    { slug: "/3d-models", displayName: "All", id: allId },
    ...categories,
  ];

  return (
    <GenericComponent
      as="ul"
      Component={Link}
      className="grid auto-cols-max grid-flow-col gap-5 px-4 py-3 md:grid-flow-row md:p-0"
      items={allCategories}
      renderKey={(item) => item.slug}
      renderProps={(item) => ({
        className: `nav-link ${pathname.endsWith(item.slug) ? "active" : ""}`,
        href:
          typeof item.id === "string"
            ? item.slug
            : `/3d-models/categories/${item.slug}`,
        children: item.displayName,
      })}
    />
  );
};

export default CategoriesNavClient;
