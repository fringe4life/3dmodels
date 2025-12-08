import type { Metadata } from "next";
import type { UnsuccessfulStateListItemProps } from "@/components/not-found/unsuccessful-state-list-item";
import type { UnsuccessfulStateLink } from "@/types";

export const CATEGORY_NOT_FOUND: Metadata = {
  title: "Category Not Found",
  description: "The category you are looking for does not exist.",
};

export const CATEGORY_LIST_ITEMS: UnsuccessfulStateListItemProps[] = [
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

export const CATEGORY_LINKS: UnsuccessfulStateLink[] = [
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
