import { defineConfig } from "@pandacss/dev";
import presetBase from "@pandacss/preset-base";
import pandaPreset from "@pandacss/preset-panda";
import { typographyPreset } from "@pandacss/preset-typography";
import { conditions } from "./theme/conditions";
import { globalCss } from "./theme/global-styles";
import { keyframes } from "./theme/keyframes";
import { patterns } from "./theme/patterns";
import { positionTry } from "./theme/position-try";
import { semanticTokens } from "./theme/semantic-tokens";
import { tokens } from "./theme/tokens";
import { utilities } from "./theme/utilities";

export default defineConfig({
  conditions,
  exclude: [],
  globalCss,
  hash: true,
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/features/**/*.{ts,tsx,js,jsx}",
  ],
  minify: true,
  optimize: {
    removeUnusedKeyframes: true,
    removeUnusedTokens: true,
    smartCompoundVariants: true,
    treeshakeDesignSystem: true,
  },
  outdir: "styled-system",
  patterns,
  preflight: true,
  presets: [presetBase, pandaPreset, typographyPreset()],
  // Font families are `theme.extend.tokens.fonts` (`theme/tokens.ts`). The app
  // ships no webfonts, so first paint already uses the final face.
  theme: {
    extend: {
      breakpoints: {
        // Keep custom responsive aliases aligned with Panda's rem breakpoints.
        mobile: "35rem", // 560px
        narrow: "22.5rem", // 360px
        tablet: "62.5rem", // 1000px
        xs: "30rem", // 480px
        xxs: "20rem", // 320px
      },
      containerNames: [
        "models-grid",
        "model-detail",
        "navbar",
        "about-story",
        "about-layers",
        "about-vision",
        // Home page "Most liked" cards: each card is its own container so the
        // split/stacked switch follows the card width, not the list width.
        "most-liked",
      ],
      // Mixed rem + ch: intentional. Offline-indicator sizes track character
      // measure (`ch`); card/detail sizes stay rem like the rest of the scale.
      // `panda doctor` warns (`config_container_units_mixed`) until Panda allows
      // mixed units without a diagnostic — leave as-is.
      containers: {
        "card-copy": "48rem",
        "card-split": "28rem",
        "detail-split": "26rem",
        // About page: sections respond to their own width, not the viewport.
        // Thresholds are *split* points (`@container` is min-inline-size),
        // matching the `card-split` convention above.
        "layers-split": "52rem",
        "offline-indicator-full": "50ch",
        "offline-indicator-small": "20ch",
        "story-split": "48rem",
        "vision-split": "45rem",
      },
      keyframes,
      positionTry,
      tokens,
    },
    // Outside `extend` on purpose: full replace of the semantic-token scale
    // (v2 claims only the named entry, so other theme scales stay). Do not
    // nest under `extend` unless we intend to merge with preset semantics.
    semanticTokens,
  },
  utilities,
});
