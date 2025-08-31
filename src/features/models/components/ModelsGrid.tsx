import type { ModelWithLike } from "@/actions/likes";
import ModelCard from "@/features/models/components/ModelCard";

type ModelsGridProps = {
  title: string;
  models: ModelWithLike[];
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
