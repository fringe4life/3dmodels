import { css } from "@styled-system/css";
import { ViewTransition } from "react";
import { modelsGrid } from "@/app/styles";
import { GenericComponent } from "@/components/generic-component";
import type { IsAuthenticated } from "@/features/auth/types";
import { ModelCard } from "@/features/models/components/model-card";
import type { Prettify } from "@/types";
import type { ModelWithLikeStatus } from "../types";

type ModelsGridProps = Prettify<
  IsAuthenticated & {
    models: ModelWithLikeStatus[];
    title: string;
  }
>;

const ModelsGrid = ({ isAuthenticated, title, models }: ModelsGridProps) => {
  const renderModelCardProps = (model: ModelWithLikeStatus) => ({
    isAuthenticated,
    model,
  });
  return (
    <div className={css({ paddingBlock: 8 })}>
      <ViewTransition name="models-grid-title">
        <h1
          className={css({
            fontSize: "3xl",
            fontWeight: "bold",
            marginBlockEnd: 8,
          })}
        >
          {title}
        </h1>
      </ViewTransition>
      <GenericComponent
        Component={ModelCard}
        className={modelsGrid}
        items={models}
        renderProps={renderModelCardProps}
      />
    </div>
  );
};

export { ModelsGrid };
