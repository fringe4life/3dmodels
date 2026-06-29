import { ViewTransition } from "react";
import type { Children } from "@/types";
import type { Page } from "../types";

interface PaginationOffsetTransitionProps<T extends Page> extends Children {
  metadata: T;
}

const PaginationOffsetTransition = <T extends Page>({
  children,
  metadata,
}: PaginationOffsetTransitionProps<T>) => (
  <ViewTransition
    enter={{
      forwards: "enter-right",
      backwards: "enter-left",
      default: "auto",
    }}
    exit={{
      forwards: "exit-left",
      backwards: "exit-right",
      default: "auto",
    }}
    key={`models-page-${metadata.page}`}
  >
    {children}
  </ViewTransition>
);

export { PaginationOffsetTransition };
