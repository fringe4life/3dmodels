import NotFound, { type NotFoundLink } from "@/components/not-found";
import type { NotFoundListItemProps } from "@/components/not-found-list-item";

const listItems: NotFoundListItemProps[] = [
  {
    text: "Check the URL for typos or try navigating from the categories menu",
  },
  {
    text: "Browse all available categories to find what you're looking for",
  },
  {
    text: "Use the search function to find specific 3D models",
  },
];

const links: NotFoundLink[] = [
  {
    href: "/3d-models",
    label: "Browse All Models",
    variant: "primary",
  },
  {
    href: "/3d-models",
    label: "View Categories",
    variant: "secondary",
  },
];
export default function CategoryNotFound() {
  return (
    <NotFound
      heading="Category Not Found"
      links={links}
      listItems={listItems}
      subheading="The category you're looking for doesn't exist or may have been removed."
    />
  );
}
