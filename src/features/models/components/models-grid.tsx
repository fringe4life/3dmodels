import GenericComponent from "@/components/generic-component";
import type { Model } from "@/db/schema/models";
import ModelCard from "./model-card";

type ModelsGridProps = {
  title: string;
  models: Model[];
};

export default function ModelsGrid({ title, models }: ModelsGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">{title}</h1>
      <GenericComponent
        Component={ModelCard}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        items={models}
        renderKey={(item) => item.id}
        renderProps={(item) => ({
          model: item,
        })}
      />
    </div>
  );
}
