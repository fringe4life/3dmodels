import { EMPTY_LIST_LENGTH } from "@/constants";
import { ModelsGrid } from "@/features/models/components/models-grid";
import { ModelsNotFound } from "@/features/models/components/models-not-found";
import { DEFAULT_TITLE } from "@/features/models/constants";
import { getModels } from "@/features/models/dal/get-models";
import type { ModelsViewProps } from "@/features/models/types";
import { Pagination } from "@/features/pagination/components/nuqs-pagination";

const ModelsView = async ({
  searchParams,
  category,
  categoryDisplayName,
  title,
}: ModelsViewProps) => {
  const { list, metadata } = await getModels(searchParams, category);

  if (!list) {
    throw new Error("Failed to load models");
  }
  if (list.length === EMPTY_LIST_LENGTH) {
    return <ModelsNotFound />;
  }

  const displayTitle = categoryDisplayName ?? title ?? DEFAULT_TITLE;

  return (
    <div className="grid auto-rows-min grid-rows-1 content-between gap-y-4">
      <ModelsGrid models={list} title={displayTitle} />
      <Pagination metadata={metadata} />
    </div>
  );
};

export { ModelsView };
