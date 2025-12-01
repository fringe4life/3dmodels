import type { Metadata } from "next";
import type { NotFoundLink } from "@/components/not-found";
import type { NotFoundListItemProps } from "@/components/not-found-list-item";

export const CATEGORY_NOT_FOUND: Metadata = {
  title: "Category Not Found",
  description: "The category you are looking for does not exist.",
};

export const CATEGORY_LIST_ITEMS: NotFoundListItemProps[] = [
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

export const CATEGORY_LINKS: NotFoundLink[] = [
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
