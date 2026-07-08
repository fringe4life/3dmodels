import type { Metadata } from "next";
import type { UnsuccessfulStateListItemProps } from "@/components/not-found/unsuccessful-state-list-item";

export const CATEGORY_NOT_FOUND: Metadata = {
  description: "The category you are looking for does not exist.",
  title: "Category Not Found",
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

export const ALL_CATEGORIES = {
  displayName: "All",
  id: "all",
  slug: "/3d-models",
} as const;
