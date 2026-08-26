import { css } from "@styled-system/css";
import { cq } from "@styled-system/patterns";

/**
 * `theme.containers.detail-split` (26rem) is the `model-detail` content box.
 * Frame adds `paddingInline: 4` (2rem); listing layout section adds another 2rem.
 * Viewport at split ≈ 26rem + 4rem = 30rem. Frame caps at `6xl` (72rem).
 */
const DETAIL_SPLIT_VIEWPORT = "30rem";
const DETAIL_FRAME_MAX_VIEWPORT = "74rem"; // 6xl (72rem) + section pad (2rem)
const DETAIL_STACKED_INLINE_PAD = "4rem"; // section + frame
/** Split media ≈ 0.94fr of surface; stay slightly conservative vs undersizing. */
const DETAIL_SPLIT_MEDIA_HINT = "calc(50vw - 2rem)";
const DETAIL_SPLIT_MEDIA_MAX = "34rem";

const MODEL_DETAIL_IMAGE_SIZES =
  `(max-width: ${DETAIL_SPLIT_VIEWPORT}) calc(100vw - ${DETAIL_STACKED_INLINE_PAD}), (max-width: ${DETAIL_FRAME_MAX_VIEWPORT}) ${DETAIL_SPLIT_MEDIA_HINT}, ${DETAIL_SPLIT_MEDIA_MAX}` as const;

const modelDetailContainer = cq({
  // with model detail we dont need subgrid at all
  // as with detail view there is no sibling content to align with
  minInlineSize: 0,
  name: "model-detail",
});

const modelDetailFrame = css({
  alignSelf: "center",
  marginInline: "auto",
  maxInlineSize: "6xl",
  minInlineSize: 0,
  paddingBlock: 8,
  paddingInline: 4,
  rounded: "lg",
});

const modelDetailSurface = css({
  "@model-detail/detail-split": {
    alignItems: "stretch",
    gap: 8,
  },
  backgroundColor: "bg.surface",
  cornerShape: "squircle",
  display: "grid",
  gap: 4,
  gridTemplateColumns: {
    "@model-detail/detail-split": "minmax(0, 0.94fr) minmax(0, 1.06fr)",
    base: "minmax(0, 1fr)",
  },
  minInlineSize: 0,
  overflow: "hidden",
  rounded: "lg",
  shadow: "lg",
});

const modelDetailMedia = css({
  "@model-detail/detail-split": {
    alignSelf: "stretch",
    aspectRatio: "auto",
    blockSize: "full",
    inlineSize: "full",
    rounded: "inherit",
    shadow: "none",
  },
  aspectRatio: "square",
  backgroundColor: "bg.muted",
  contain: "content",
  cornerShape: "squircle",
  overflow: "hidden",
  position: "relative",
  rounded: "lg",
  shadow: "lg",
});

const modelDetailImage = css({ objectFit: "cover" });

const modelDetailContent = css({
  "@model-detail/detail-split": {
    alignSelf: "stretch",
    justifyContent: "center",
    paddingBlock: 6,
    paddingInline: 2,
  },
  display: "flex",
  flexDirection: "column",
  minInlineSize: 0,
  padding: 4,
});

const modelDetailTitle = css({
  fontSize: "clamp(1.75rem, 6.8cqi, 2.5rem)",
  fontWeight: "bold",
  lineHeight: "tight",
  marginBlockEnd: 6,
});

const modelDetailCategory = css({
  alignSelf: "start",
  fontSize: "clamp(0.75rem, 2.2cqi, 0.875rem)",
  marginBlockEnd: 6,
});

const modelDetailDescription = css({
  color: "text.secondary",
  fontSize: "clamp(0.95rem, 3.4cqi, 1.125rem)",
  lineHeight: "relaxed",
  marginBlockEnd: 6,
  maxInlineSize: "none",
});

const modelDetailFooter = css({
  alignItems: "center",
  borderBlockStartWidth: 1,
  borderColor: "border.subtle",
  color: "text.muted",
  display: "flex",
  flexWrap: "wrap",
  fontSize: "clamp(0.7rem, 2.25cqi, 0.875rem)",
  gap: 3,
  justifyContent: "space-between",
  marginBlockStart: "auto",
  paddingBlockStart: 4,
});

export {
  MODEL_DETAIL_IMAGE_SIZES,
  modelDetailCategory,
  modelDetailContainer,
  modelDetailContent,
  modelDetailDescription,
  modelDetailFooter,
  modelDetailFrame,
  modelDetailImage,
  modelDetailMedia,
  modelDetailSurface,
  modelDetailTitle,
};
