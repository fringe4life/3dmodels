const ModelCardSkeleton = () => (
  <article className="corner-squircle skeleton-enter animate-pulse rounded-lg bg-white shadow-md">
    {/* Image skeleton - aspect-square matching the actual card */}
    <div className="aspect-square rounded-t-lg bg-gray-200" />

    {/* Content section with same padding as model-card */}
    <div className="p-4">
      {/* Title skeleton - min-block-14 with 2 lines */}
      <div className="mbe-2 min-block-14 space-y-2">
        <div className="block-5 inline-3/4 rounded bg-gray-200" />
      </div>

      {/* Description skeleton - min-block-10 with 2 lines */}
      <div className="min-block-10 space-y-2">
        <div className="block-4 inline-full rounded bg-gray-200" />
        <div className="block-4 inline-5/6 rounded bg-gray-200" />
      </div>

      {/* Category pill skeleton */}
      <div className="mbs-2">
        <div className="block-7 inline-20 rounded-full bg-gray-200" />
      </div>

      {/* Heart button skeleton */}
      <div className="mbs-2 flex items-center">
        <div className="block-5 inline-14 rounded bg-gray-200" />
      </div>
    </div>
  </article>
);

export { ModelCardSkeleton };
