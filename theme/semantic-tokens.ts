import { defineSemanticTokens } from "@pandacss/dev";

export const semanticTokens = defineSemanticTokens({
  colors: {
    // Surfaces / backgrounds
    bg: {
      muted: { value: "{colors.gray.200}" },
      subtle: { value: "{colors.gray.50}" },
      surface: { value: "white" },
    },

    // Borders
    border: {
      DEFAULT: { value: "{colors.gray.300}" },
      strong: { value: "{colors.gray.500}" },
      subtle: { value: "{colors.gray.200}" },
    },
    // Brand
    brand: {
      DEFAULT: { value: "{colors.orangeAccent}" },
      hover: { value: "{colors.orangeAccent/90}" }, // button hover
      muted: { value: "{colors.orangeAccent/75}" }, // nav hover
      ring: { value: "{colors.orangeAccent}" }, // focus ring
      subtle: { value: "{colors.orangeAccent/50}" },
    },

    // Feedback — error
    error: {
      bg: { value: "{colors.red.50}" },
      DEFAULT: { value: "{colors.red.500}" },
      text: { value: "{colors.red.800}" },
    },

    // Feedback — like / heart
    like: {
      DEFAULT: { value: "{colors.red.500}" },
      hover: { value: "{colors.red.500/50}" },
      pending: { value: "{colors.red.500/75}" },
    },

    // Text hierarchy
    text: {
      inverse: { value: "white" },
      muted: { value: "{colors.gray.500}" },
      placeholder: { value: "{colors.gray.400}" },
      primary: { value: "{colors.gray.900}" },
      secondary: { value: "{colors.gray.700}" },
    },
  },
});
