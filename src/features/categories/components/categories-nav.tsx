import { ViewTransition } from "react";
import { GenericComponent } from "@/components/generic-component";
import { NavLinkListItem } from "@/components/nav-link";
import { grid } from "../../../../styled-system/patterns";
import { ALL_CATEGORIES } from "../constants";
import type { CategoriesNavProps } from "../types";

const CategoriesNav = ({ categories }: CategoriesNavProps) => {
  const allCategories = [ALL_CATEGORIES, ...categories];
  return (
    <ViewTransition name="categories-nav">
      <GenericComponent
        as="ul"
        Component={NavLinkListItem}
        className={grid({
          gridAutoColumns: "max",
          gridAutoFlow: { base: "column", md: "row" },
          gap: 4,
          paddingInline: { base: 4, md: 0 },
          paddingBlock: { base: 2, md: 0 },
        })}
        items={allCategories}
        renderKey={(item) => item.slug}
        renderProps={(item) => ({
          matchStrategy: "endsWith" as const,
          href:
            typeof item.id === "string"
              ? item.slug
              : `/3d-models/categories/${item.slug}`,
          children: item.displayName,
          borderPosition: "left" as const,
          transitionTypes: ["change-category"],
        })}
      />
    </ViewTransition>
  );
};

export { CategoriesNav };
