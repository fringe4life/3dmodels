import { css } from "@styled-system/css";
import { ModelCardSkeleton } from "./model-card-skeleton";
import { modelsGrid } from "./models-grid.styles";

const ModelsGridSkeleton = () => (
  <div aria-hidden="true" className={css({ paddingBlockEnd: 8 })}>
    <div className={modelsGrid}>
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
    </div>
  </div>
);

export { ModelsGridSkeleton };
