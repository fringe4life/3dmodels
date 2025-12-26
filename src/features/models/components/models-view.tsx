import ModelsGrid from "@/features/models/components/models-grid";
import ModelsNotFound from "@/features/models/components/models-not-found";
import { DEFAULT_TITLE } from "@/features/models/constants";
import { getModels } from "@/features/models/dal/get-models";
import Pagination from "@/features/pagination/components/nuqs-pagination";
import type { SearchParamsProps } from "@/types";

type ModelsViewProps = SearchParamsProps & {
  category?: string;
  categoryDisplayName?: string;
  title?: string;
};

const ModelsView = async ({
  searchParams,
  category,
  categoryDisplayName,
  title,
}: ModelsViewProps) => {
  const result = await getModels(searchParams, category);
  if (!result.list) {
    throw new Error("Failed to load models");
  }
  if (result.list.length === 0) {
    return <ModelsNotFound />;
  }

  const displayTitle = categoryDisplayName ?? title ?? DEFAULT_TITLE;

  const { metadata, list } = result;

  return (
    <div className="grid auto-rows-min grid-rows-1 content-between gap-y-4">
      <ModelsGrid models={list} title={displayTitle} />
      <Pagination metadata={metadata} />
    </div>
  );
};

export default ModelsView;
