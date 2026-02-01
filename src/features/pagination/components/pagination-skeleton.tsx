const PaginationSkeleton = () => {
  return (
    <div className="skeleton-enter flex items-center justify-between">
      <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
      <div className="flex items-center gap-x-2">
        <div className="h-10 w-5 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-5 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-5 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export { PaginationSkeleton };
