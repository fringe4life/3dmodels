import { ViewTransition } from "react";
import type { CategoriesBlockTransitionProps } from "../types";

const CategoriesBlockTransition = ({
  children,
  categoryName,
}: CategoriesBlockTransitionProps) => (
  <ViewTransition
    enter={{
      "change-category": "enter-block",
      default: "auto",
    }}
    exit={{
      "change-category": "exit-block",
      default: "auto",
    }}
    key={`category-${categoryName}`}
  >
    {children}
  </ViewTransition>
);

export { CategoriesBlockTransition };
