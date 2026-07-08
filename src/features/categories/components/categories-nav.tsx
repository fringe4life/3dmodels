import { grid } from "@styled-system/patterns";
import { ViewTransition } from "react";
import { GenericComponent } from "@/components/generic-component";
import { NavLinkListItem } from "@/components/nav-link/nav-link-list-item";
import type { DbCategory } from "@/db/schema/models";
import { ALL_CATEGORIES } from "../constants";

interface CategoriesNavProps {
  categories: DbCategory[];
}

type CategoryNavItem = DbCategory | typeof ALL_CATEGORIES;

const renderCategoryNavProps = (item: CategoryNavItem) => ({
  borderPosition: "left" as const,
  children: item.displayName,
  href:
    typeof item.id === "string"
      ? item.slug
      : `/3d-models/categories/${item.slug}`,
  matchStrategy: "endsWith" as const,
  transitionTypes: ["change-category"],
});

const CategoriesNav = ({ categories }: CategoriesNavProps) => {
  const allCategories = [ALL_CATEGORIES, ...categories];

  return (
    <ViewTransition name="categories-nav">
      <GenericComponent
        as="ul"
        Component={NavLinkListItem}
        className={grid({
          gap: 4,
          gridAutoColumns: "max",
          gridAutoFlow: { base: "column", md: "row" },
          paddingBlock: { base: 2, md: 0 },
          paddingInline: { base: 4, md: 0 },
        })}
        items={allCategories}
        renderProps={renderCategoryNavProps}
      />
    </ViewTransition>
  );
};

export { CategoriesNav };
