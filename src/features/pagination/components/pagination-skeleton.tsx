const PaginationSkeleton = () => {
  return (
    <div className="skeleton-enter flex items-center justify-between">
      <div className="block-10 inline-24 animate-pulse rounded bg-gray-200" />
      <div className="flex items-center gap-x-2">
        <div className="block-10 aspect-square animate-pulse rounded bg-gray-200" />
        <div className="block-10 inline-4 animate-pulse rounded bg-gray-200" />
        <div className="block-10 inline-4 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export { PaginationSkeleton };
