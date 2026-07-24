import { css } from "@styled-system/css";
import { ViewTransition } from "react";
import { modelsGrid } from "@/app/styles";
import { GenericComponent } from "@/components/generic-component";
import { Suspend } from "@/components/suspend";
import type { IsAuthenticated } from "@/features/auth/types";
import { ModelCard } from "@/features/models/components/model-card";
import { ModelsSortControls } from "@/features/models/components/models-sort-controls";
import { ModelsSortControlsSkeleton } from "@/features/models/components/models-sort-controls-skeleton";
import type { Prettify } from "@/types";
import type { ModelWithLikeStatus } from "../types";

type ModelsGridProps = Prettify<
  IsAuthenticated & {
    models: ModelWithLikeStatus[];
    title: string;
  }
>;

const ModelsGrid = ({ isAuthenticated, title, models }: ModelsGridProps) => {
  const renderModelCardProps = (model: ModelWithLikeStatus, index: number) => ({
    isAuthenticated,
    model,
    priority: index < 4,
  });
  return (
    <div className={css({ paddingBlock: 8 })}>
      <div
        className={css({
          alignItems: { base: "flex-start", lg: "center" },
          display: "flex",
          flexDirection: { base: "column", lg: "row" },
          gap: 4,
          justifyContent: "space-between",
          marginBlockEnd: 8,
        })}
      >
        <ViewTransition name="models-grid-title">
          <h1
            className={css({
              fontSize: "3xl",
              fontWeight: "bold",
            })}
          >
            {title}
          </h1>
        </ViewTransition>
        <Suspend fallback={<ModelsSortControlsSkeleton />}>
          <ModelsSortControls />
        </Suspend>
      </div>
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
