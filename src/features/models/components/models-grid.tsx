import { css } from "@styled-system/css";
import type { Route } from "next";
import { modelsGrid } from "@/app/styles";
import { GenericComponent } from "@/components/generic-component";
import type { IsAuthenticated } from "@/features/auth/types";
import { modelDetailHref } from "@/features/models/back-link/from-search-params";
import { ModelCard } from "@/features/models/components/model-card";
import type { Prettify } from "@/types";
import type { ModelWithLikeStatus } from "../types";

type ModelsGridProps = Prettify<
  IsAuthenticated & {
    models: ModelWithLikeStatus[];
    returnTo: Route;
  }
>;

const ModelsGrid = ({ isAuthenticated, models, returnTo }: ModelsGridProps) => {
  const renderModelCardProps = (model: ModelWithLikeStatus, index: number) => ({
    href: modelDetailHref(model.slug, returnTo),
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
