import { ViewTransition } from "react";
import type { Page, PaginationOffsetTransitionProps } from "../types";

const PaginationOffsetTransition = <T extends Page>({
  children,
  metadata,
}: PaginationOffsetTransitionProps<T>) => {
  return (
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
};

export { PaginationOffsetTransition };
