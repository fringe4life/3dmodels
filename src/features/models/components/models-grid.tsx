import { css } from "@styled-system/css";
import { modelsGrid } from "@/app/styles";
import { GenericComponent } from "@/components/generic-component";
import type { IsAuthenticated } from "@/features/auth/types";
import { ModelCard } from "@/features/models/components/model-card";
import type { Prettify } from "@/types";
import type { ModelWithLikeStatus } from "../types";

type ModelsGridProps = Prettify<
  IsAuthenticated & {
    models: ModelWithLikeStatus[];
  }
>;

const ModelsGrid = ({ isAuthenticated, models }: ModelsGridProps) => {
  const renderModelCardProps = (model: ModelWithLikeStatus, index: number) => ({
    isAuthenticated,
    model,
    priority: index < 4,
  });
  return (
    <div className={css({ paddingBlockEnd: 8 })}>
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
