import type { Metadata } from "next";
import type { UnsuccessfulStateListItemProps } from "@/types";

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
