import { ModelCardSkeleton } from "./model-card-skeleton";

const ModelsGridSkeleton = () => (
  <div className="skeleton-enter container mx-auto py-8">
    <div className="animate-pulse">
      <div className="mbe-8 block-8 inline-2/3 max-inline-40 rounded bg-gray-200" />
    </div>
    <div className="models-grid">
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
    </div>
  </div>
);

export { ModelsGridSkeleton };
