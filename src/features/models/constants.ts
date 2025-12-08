import type { Metadata } from "next";
import type { UnsuccessfulStateListItemProps } from "@/components/not-found/unsuccessful-state-list-item";
import type { UnsuccessfulStateLink } from "@/types";

export const MODEL_NOT_FOUND: Metadata = {
  title: "Model Not Found",
  description: "The model you are looking for does not exist.",
};

export const MODEL_LIST_ITEMS: UnsuccessfulStateListItemProps[] = [
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

export const MODEL_LINKS: UnsuccessfulStateLink[] = [
  {
    href: "/3d-models",
    label: "Browse All Models",
    variant: "primary",
  },
];

export const MODELS_ERROR_LIST: UnsuccessfulStateListItemProps[] = [
  {
    text: "Check your internet connection and ensure you're online",
  },
  {
    text: "The server may be temporarily unavailable - try again in a few moments",
  },
  {
    text: "Clear your browser cache or try refreshing the page",
  },
  {
    text: "If the problem persists, the issue may be on our end - please try again later",
  },
];

export const DEFAULT_TITLE = "3D Models";
