const ModelCardSkeleton = () => (
  <article className="corner-squircle skeleton-enter animate-pulse rounded-lg bg-white shadow-md">
    {/* Image skeleton - aspect-square matching the actual card */}
    <div className="aspect-square rounded-t-lg bg-gray-200" />

    {/* Content section with same padding as model-card */}
    <div className="p-4">
      {/* Title skeleton - min-h-14 with 2 lines */}
      <div className="mb-2 min-h-14 space-y-2">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
      </div>

      {/* Description skeleton - min-h-10 with 2 lines */}
      <div className="min-h-10 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
      </div>

      {/* Category pill skeleton */}
      <div className="mt-2">
        <div className="h-7 w-20 rounded-full bg-gray-200" />
      </div>

      {/* Heart button skeleton */}
      <div className="mt-2 flex items-center">
        <div className="h-5 w-14 rounded bg-gray-200" />
      </div>
    </div>
  </article>
);

export { ModelCardSkeleton };
