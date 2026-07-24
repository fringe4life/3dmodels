import { viewTransition } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";
import type { CategoryName } from "../types";

type CategoriesBlockTransitionProps = Prettify<CategoryName & Children>;

const enterBlock = viewTransition({
  new: {
    "--slide-distance-y": "-20px",
    animationDuration: "200ms",
    animationName: "fade-in, slide-in-y",
    animationTimingFunction: "glide",
  },
});

const exitBlock = viewTransition({
  old: {
    "--slide-distance-y": "20px",
    animationDuration: "200ms",
    animationName: "fade-out, slide-out-y",
    animationTimingFunction: "glide",
  },
});

const CategoriesBlockTransition = ({
  children,
  categoryName,
}: CategoriesBlockTransitionProps) => (
  <ViewTransition
    enter={{
      "change-category": enterBlock,
      default: "auto",
    }}
    exit={{
      "change-category": exitBlock,
      default: "auto",
    }}
    key={`category-${categoryName}`}
  >
    {children}
  </ViewTransition>
);

export { CategoriesBlockTransition };
