"use client";

import { css } from "@styled-system/css";
import { useCallback, useId, useState } from "react";
import { SeedFromSearchParam } from "@/components/scripts/seed-from-search-param";
import { useSyncSearchParamValue } from "@/hooks/use-sync-search-param";

interface ModelsGridTitleProps {
  fallbackTitle: string;
}

const ModelsGridTitle = ({ fallbackTitle }: ModelsGridTitleProps) => {
  const titleId = useId();
  const [title, setTitle] = useState(fallbackTitle);

  const syncQuery = useCallback(
    (value: string | null) => {
      setTitle(value ? `Results for "${value}"` : fallbackTitle);
    },
    [fallbackTitle],
  );

  useSyncSearchParamValue("query", syncQuery);

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
