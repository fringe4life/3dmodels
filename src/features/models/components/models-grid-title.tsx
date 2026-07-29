"use client";

import { css } from "@styled-system/css";
import { useQueryStates } from "nuqs";
import { queryParser } from "@/features/pagination/pagination-search-params";

interface ModelsGridTitleProps {
  fallbackTitle: string;
}

const ModelsGridTitle = ({ fallbackTitle }: ModelsGridTitleProps) => {
  const [{ query }] = useQueryStates(queryParser);
  const title = query ? `Results for "${query}"` : fallbackTitle;

  return (
    <h1
      className={css({
        fontSize: { base: "xl", lg: "3xl" },
        fontWeight: "bold",
      })}
    >
      {title}
    </h1>
  );
};

export { ModelsGridTitle };
