import { css } from "@styled-system/css";
import { modelsGrid } from "../../../app/styles";
import { ModelCardSkeleton } from "./model-card-skeleton";

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
