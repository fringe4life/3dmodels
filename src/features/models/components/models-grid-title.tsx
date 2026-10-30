"use client";

import { css } from "@styled-system/css";
import { useId, useState } from "react";
import { SeedFromSearchParam } from "@/components/scripts/seed-from-search-param";
import { useSyncSearchParamValue } from "@/hooks/use-sync-search-param";

interface ModelsGridTitleProps {
  fallbackTitle: string;
}

const ModelsGridTitle = ({ fallbackTitle }: ModelsGridTitleProps) => {
  const titleId = useId();
  const [query, setQuery] = useState<string | null>(null);

  useSyncSearchParamValue("query", setQuery);

  const title = query ? `Results for "${query}"` : fallbackTitle;

  return (
    <>
      <h1
        className={css({
          fontSize: { base: "xl", lg: "3xl" },
          fontWeight: "bold",
        })}
        id={titleId}
        suppressHydrationWarning
      >
        {title}
      </h1>
      <SeedFromSearchParam mode="text" param="query" targetId={titleId} />
    </>
  );
};

export { ModelsGridTitle };
