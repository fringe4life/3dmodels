import NotFound, { type NotFoundLink } from "@/components/not-found";
import type { NotFoundListItemProps } from "@/components/not-found-list-item";

const listItems: NotFoundListItemProps[] = [
  {
    text: "Verify the model URL is correct - check for typos or outdated links",
  },
  {
    text: "Browse our collection to discover similar 3D models that might interest you",
  },
  {
    text: "Use the search function to find models by name, category, or keywords",
  },
  {
    text: "Explore categories to find models in your area of interest",
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
    label: "Search Models",
    variant: "secondary",
  },
];
export default function ModelNotFound() {
  return (
    <NotFound
      heading="404 - Model Not Found"
      links={links}
      listItems={listItems}
      subheading="The 3D model you're looking for doesn't exist or may have been removed from our collection."
    />
  );
}
