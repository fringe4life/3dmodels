import type { Metadata } from "next";
import type { NotFoundLink } from "@/components/not-found/not-found";
import type { NotFoundListItemProps } from "@/components/not-found/not-found-list-item";

export const MODEL_NOT_FOUND: Metadata = {
  title: "Model Not Found",
  description: "The model you are looking for does not exist.",
};

export const MODEL_LIST_ITEMS: NotFoundListItemProps[] = [
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

export const MODEL_LINKS: NotFoundLink[] = [
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

export const DEFAULT_TITLE = "3D Models";
