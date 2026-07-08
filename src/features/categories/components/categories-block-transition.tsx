import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";
import type { CategoryName } from "../types";

type CategoriesBlockTransitionProps = Prettify<CategoryName & Children>;

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
