import { cacheLife } from "next/cache";

// biome-ignore lint/suspicious/useAwait: needed for use cache
export async function ModelsGridSkeleton() {
  "use cache";
  cacheLife("max");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="mb-8 h-8 w-1/3 rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="h-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-lg bg-gray-200" />
          <div className="h-64 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
