import GenericComponent from "@/components/generic-component";
import ModelCard from "@/features/models/components/model-card";
import type { ModelsGridProps } from "../types";

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
