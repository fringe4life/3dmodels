import { ModelsGridHeaderSkeleton } from "@/features/models/components/models-grid-header-skeleton";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";

const ResultsLoading = () => (
  <>
    <ModelsGridHeaderSkeleton />
    <ModelsGridSkeleton />
  </>
);

export default ResultsLoading;
