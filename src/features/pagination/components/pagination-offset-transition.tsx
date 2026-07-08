import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";
import type { Page } from "../types";

type PaginationOffsetTransitionProps<T extends Page> = Prettify<
  Children & {
    metadata: T;
  }
>;

const PaginationOffsetTransition = <T extends Page>({
  children,
  metadata,
}: PaginationOffsetTransitionProps<T>) => (
  <ViewTransition
    enter={{
      backwards: "enter-left",
      default: "auto",
      forwards: "enter-right",
    }}
    exit={{
      backwards: "exit-right",
      default: "auto",
      forwards: "exit-left",
    }}
    key={`models-page-${metadata.page}`}
  >
    {children}
  </ViewTransition>
);

export { PaginationOffsetTransition };
