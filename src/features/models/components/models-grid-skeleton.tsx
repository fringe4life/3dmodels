import { ModelCardSkeleton } from "./model-card-skeleton";

const ModelsGridSkeleton = () => (
  <div className="skeleton-enter container mx-auto py-8">
    <div className="animate-pulse">
      <div className="mb-8 h-8 w-2/3 max-w-40 rounded bg-gray-200" />
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
