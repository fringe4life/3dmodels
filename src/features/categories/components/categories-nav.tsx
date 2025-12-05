import GenericComponent from "@/components/generic-component";
import NavLink from "@/components/nav-link";
import type { Category } from "@/db/schema/models";

type CategoriesNavProps = {
  categories: Category[];
};

const CategoriesNav = ({ categories }: CategoriesNavProps) => {
  const allCategories = [
    { slug: "/3d-models", displayName: "All", id: "all" },
    ...categories,
  ];

  return (
    <GenericComponent
      as="ul"
      Component={NavLink}
      className="grid auto-cols-max grid-flow-col gap-5 px-4 py-3 md:grid-flow-row md:p-0"
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
      })}
    />
  );
};

export default CategoriesNav;
