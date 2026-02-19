import { ViewTransition } from "react";
import { GenericComponent } from "@/components/generic-component";
import { ModelCard } from "@/features/models/components/model-card";
import { sanitiseName } from "@/utils/sanitise-name";
import type { ModelsGridProps } from "../types";

const ModelsGrid = ({ title, models }: ModelsGridProps) => (
  <div className="py-8">
    <ViewTransition name={`title-${sanitiseName(title)}`}>
      <h1 className="mb-8 font-bold text-3xl">{title}</h1>
    </ViewTransition>
    <GenericComponent
      Component={ModelCard}
      className="models-grid"
      items={models}
      renderKey={(item) => item.slug}
      renderProps={(model) => ({ model })}
    />
  </div>
);

export { ModelsGrid };
