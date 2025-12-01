import GenericComponent from "@/components/generic-component";
import type { Model } from "@/db/schema/models";
import ModelCard from "@/features/models/components/model-card";

type ModelsGridProps = {
  title: string;
  models: Model[];
};

const ModelsGrid = ({ title, models }: ModelsGridProps) => (
  <div className="container mx-auto py-8">
    <h1 className="mb-8 font-bold text-3xl">{title}</h1>
    <GenericComponent
      Component={ModelCard}
      className="models-grid"
      items={models}
      renderKey={(item) => item.slug}
      renderProps={(model) => ({ model })}
    />
  </div>
);

export default ModelsGrid;
