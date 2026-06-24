import { css } from "@styled-system/css";
import { ViewTransition } from "react";
import { GenericComponent } from "@/components/generic-component";
import { ModelCard } from "@/features/models/components/model-card";
import { modelsGrid } from "../../../app/styles";
import type { ModelsGridProps } from "../types";

const ModelsGrid = ({ isAuthenticated, title, models }: ModelsGridProps) => (
  <div className={css({ paddingBlock: 8 })}>
    <ViewTransition name="models-grid-title">
      <h1
        className={css({
          marginBlockEnd: 8,
          fontWeight: "bold",
          fontSize: "3xl",
        })}
      >
        {title}
      </h1>
    </ViewTransition>
    <GenericComponent
      Component={ModelCard}
      className={modelsGrid}
      items={models}
      renderProps={(model) => ({ isAuthenticated, model })}
    />
  </div>
);

export { ModelsGrid };
