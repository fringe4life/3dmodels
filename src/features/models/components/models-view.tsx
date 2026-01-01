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
  const result = await getModels(searchParams, category);

  const displayTitle = categoryDisplayName ?? title ?? DEFAULT_TITLE;

  switch (result.type) {
    case "error":
      throw new Error(result.message);
    case "empty":
      return <ModelsNotFound />;
    case "success":
      return (
        <div className="grid auto-rows-min grid-rows-1 content-between gap-y-4">
          <ModelsGrid models={result.items} title={displayTitle} />
          <Pagination metadata={result.metadata} />
        </div>
      );
    default:
      throw new Error("Should not happen") as never;
  }
};

export { ModelsView };
