import type { Model } from "@/db/schema";
import ModelCard from "@/features/models/components/ModelCard";

type ModelsGridProps = {
  title: string;
  models: Model[];
};

export default function ModelsGrid({ title, models }: ModelsGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">{title}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
}

// Suspense fallback skeleton for ModelsGrid
export function ModelsGridSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="mb-8 h-8 w-1/3 rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton items don't change order
              key={`grid-skeleton-${index}`}
              className="h-64 rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
