import { Suspense } from "react";
import { ModelsContent } from "@/features/models/components/models-content";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { DEFAULT_TITLE } from "@/features/models/constants";
import { getModels } from "@/features/models/dal/get-models";
import type { ModelsViewProps } from "@/features/models/types";

const ModelsView = ({
  searchParams,
  category,
  categoryDisplayName,
  title,
}: ModelsViewProps) => {
  const modelsPromise = getModels(searchParams, category);
  const displayTitle = categoryDisplayName ?? title ?? DEFAULT_TITLE;

  return (
    <Suspense fallback={<ModelsGridSkeleton />}>
      <ModelsContent
        displayTitle={displayTitle}
        modelsPromise={modelsPromise}
      />
    </Suspense>
  );
};

export { ModelsView };
