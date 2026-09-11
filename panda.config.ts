import { defineConfig } from "@pandacss/dev";
import presetBase from "@pandacss/preset-base";
import pandaPreset from "@pandacss/preset-panda";
import { typographyPreset } from "@pandacss/preset-typography";
import { conditions } from "./theme/conditions";
import { globalCss } from "./theme/global-styles";
import { keyframes } from "./theme/keyframes";
import { patterns } from "./theme/patterns";
import { semanticTokens } from "./theme/semantic-tokens";
import { tokens } from "./theme/tokens";
import { utilities } from "./theme/utilities";

export default defineConfig({
  conditions,
  exclude: [],
  globalCss,
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/features/**/*.{ts,tsx,js,jsx}",
  ],
  minify: true,
  optimize: {
    removeUnusedKeyframes: false,
    removeUnusedTokens: true,
    smartCompoundVariants: true,
    treeshakeDesignSystem: true,
  },
  outdir: "styled-system",
  patterns,
  preflight: true,
  presets: [presetBase, pandaPreset, typographyPreset()],
  theme: {
    extend: {
      breakpoints: {
        // Keep units consistent with Panda's default rem breakpoints.
        xs: "30rem", // 480px
        xxs: "20rem", // 320px
      },
      containerNames: ["models-grid", "model-detail", "navbar"],
      containers: {
        "card-copy": "48rem",
        "card-split": "28rem",
        "detail-split": "26rem",
        "offline-indicator-full": "50ch",
        "offline-indicator-small": "20ch",
      },
      keyframes,
      tokens,
    },
    semanticTokens,
  },
  utilities,
});
