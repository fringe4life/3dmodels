"use client";

import { use, ViewTransition } from "react";
import { Pagination } from "@/features/pagination/components/pagination";
import type { ModelsContentProps } from "../types";
import { ModelsGrid } from "./models-grid";
import { ModelsNotFound } from "./models-not-found";

const ModelsContent = ({ modelsPromise, displayTitle }: ModelsContentProps) => {
  const result = use(modelsPromise);
  switch (result.type) {
    case "error":
      throw new Error(result.message);
    case "empty":
      return (
        <>
          <ModelsNotFound />
          <p className="pr-1 text-right text-gray-500 text-italic text-sm">
            No models found
          </p>
        </>
      );
    case "success":
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
          key={`models-page-${result.metadata.page}`}
        >
          <div className="grid auto-rows-min grid-rows-1 content-between gap-y-4">
            <ModelsGrid models={result.items} title={displayTitle} />
            <Pagination metadata={result.metadata} />
          </div>
        </ViewTransition>
      );
    default:
      throw new Error("Should not happen") as never;
  }
};

export { ModelsContent };
