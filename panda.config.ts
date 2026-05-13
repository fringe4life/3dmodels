import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import typographyPreset from "pandacss-preset-typography";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/features/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    semanticTokens: {
      colors: {
        // Brand
        brand: {
          DEFAULT: { value: "{colors.orangeAccent}" },
          hover: { value: "{colors.orangeAccent/90}" }, // button hover
          muted: { value: "{colors.orangeAccent/75}" }, // nav hover
          subtle: { value: "{colors.orangeAccent/50}" },
          ring: { value: "{colors.orangeAccent}" }, // focus ring
        },

        // Text hierarchy
        text: {
          primary: { value: "{colors.gray.900}" },
          secondary: { value: "{colors.gray.700}" },
          muted: { value: "{colors.gray.500}" },
          placeholder: { value: "{colors.gray.400}" },
          inverse: { value: "white" },
        },

        // Borders
        border: {
          DEFAULT: { value: "{colors.gray.300}" },
          strong: { value: "{colors.gray.500}" },
          subtle: { value: "{colors.gray.200}" },
        },

        // Surfaces / backgrounds
        bg: {
          surface: { value: "white" },
          subtle: { value: "{colors.gray.50}" },
          muted: { value: "{colors.gray.200}" },
        },

        // Feedback — like / heart
        like: {
          DEFAULT: { value: "{colors.red.500}" },
          pending: { value: "{colors.red.500/75}" },
          hover: { value: "{colors.red.500/50}" },
        },

        // Feedback — error
        error: {
          DEFAULT: { value: "{colors.red.500}" },
          text: { value: "{colors.red.800}" },
          bg: { value: "{colors.red.50}" },
        },
      },
    },
    extend: {
      keyframes: {
        "fade-in": {
          from: {
            filter: "blur(2px)",
            opacity: 0,
          },
          to: {
            filter: "blur(0px)",
            opacity: 1,
          },
        },
        "fade-out": {
          from: {
            filter: "blur(2px)",
            opacity: 1,
          },
          to: {
            filter: "blur(0px)",
            opacity: 0,
          },
        },
        "slide-in": {
          from: {
            translate: "var(--slide-distance)",
          },
          to: {
            translate: "0 0",
          },
        },
        "slide-out": {
          from: {
            translate: "0 0",
          },
          to: {
            translate: "var(--slide-distance)",
          },
        },
        "slide-in-y": {
          from: {
            translate: "0 var(--slide-distance-y)",
          },
          to: {
            translate: "0 0",
          },
        },
        "slide-out-y": {
          from: {
            translate: "0 0",
          },
          to: {
            translate: "0 var(--slide-distance-y)",
          },
        },
        /** Scroll-linked nav reading bar (see `ScrollProgress`) */
        navProgressReveal: {
          to: { opacity: 1 },
        },
        navProgressFill: {
          to: { transform: "scaleX(1)" },
        },
        /** Sticky main header: elevates on page scroll (see `Navbar`) */
        navAnimation: {
          to: {
            boxShadow:
              "0 1px 2px token(colors.gray.300/0.2), 0 2px 4px token(colors.black/0.2), 0 4px 8px token(colors.black/0.1)",
            borderRadius: "100dvw",
            translate: "0 8px",
          },
        },
        /** Horizontal category strip: edge fade follows self-scroll (see 3d-models layout) */
        categoriesScrollMask: {
          "0%": {
            maskImage: "linear-gradient(to right, black 95%, transparent 100%)",
          },
          "5%": {
            maskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          },
          "95%": {
            maskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          },
          "100%": {
            maskImage: "linear-gradient(to right, transparent 0%, black 5%)",
          },
        },
        /** View-timeline enter/exit on narrow viewports (see `ModelCard`) */
        animateModelIn: {
          "20%": { translate: "0 25%", opacity: "0" },
          "100%": { translate: "0 0", opacity: "1" },
        },
        animateModelOut: {
          from: { translate: "0 0", opacity: "1" },
          to: { translate: "0 -25%", opacity: "0" },
        },
      },
      tokens: {
        colors: {
          orangeAccent: { value: "oklch(71.85% 0.17 47.43)" },
          searchInput: { value: "oklch(48.91% 0 0)" },
        },
        shadows: {
          modelCardHover: {
            value: [
              "0 1px 2px gray.200/20",
              "0 2px 4px black/20",
              "0 4px 8px black/10",
            ],
          },
        },
        sizes: {
          categoryWidthTablet: { value: "140px" },
        },
        blurs: {
          "2xs": { value: "2px" },
        },
        easings: {
          soft: {
            value:
              "linear(0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%, 1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%, 1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1)",
          },
          glide: {
            value:
              "linear(0, 0.012 0.9%, 0.05 2%, 0.411 9.2%, 0.517 11.8%, 0.611 14.6%, 0.694 17.7%, 0.765 21.1%, 0.824 24.8%, 0.872 28.9%, 0.91 33.4%, 0.939 38.4%, 0.977 50.9%, 0.994 68.4%, 1)",
          },
          outDramatic: {
            value:
              "linear(0, 0.618 4.6%, 1.072 9.7%, 1.358 15.3%, 1.446 18.4%, 1.497 21.7%, 1.512 23.9%, 1.514 26.2%, 1.481 31.5%, 1.421 36.4%, 1.174 53.4%, 1.108 59.5%, 1.059 65.7%, 1.028 71.9%, 1.009 78.9%, 1)",
          },
          inDramatic: {
            value:
              "linear(0, -0.009 21.1%, -0.028 28.1%, -0.059 34.3%, -0.108 40.5%, -0.174 46.6%, -0.421 63.6%, -0.481 68.5%, -0.514 73.8%, -0.512 76.1%, -0.497 78.3%, -0.446 81.6%, -0.358 84.7%, -0.072 90.3%, 0.382 95.4%, 1)",
          },
          smoothInOut: {
            value:
              "linear(0, -0.01 4.8%, -0.044 9.4%, -0.226 23.1%, -0.271 27.7%, -0.28 30.1%, -0.276 32.4%, -0.227 36.6%, -0.108 40.8%, 0.083 44.7%, 0.76 53%, 1.006 56.9%, 1.175 61.2%, 1.229 63.5%, 1.264 65.9%, 1.28 69.3%, 1.265 73.1%, 1.224 77.1%, 1.044 90.6%, 1.01 95.2%, 1)",
          },
        },
      },
    },
  },
  // In panda.config.ts → theme.extend.semanticTokens

  patterns: {
    extend: {
      between: {
        description:
          "creates a flex container, aligns items center and justifies between",
        transform({ properties }) {
          return {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ...properties,
          };
        },
      },
      hoverShadow: {
        description:
          "reveals a box shadow via an ::after pseudo-element on hover",
        properties: {
          shadow: { type: "token", value: "shadows" },
        },
        transform({ shadow }) {
          return {
            position: "relative",
            _after: {
              content: '""',
              position: "absolute",
              inset: "0",
              rounded: "inherit",
              opacity: "0",
              boxShadow: shadow,
              transitionProperty: "opacity",
              transitionDuration: "normal",
              zIndex: -1,
            },
            _hover: {
              _after: {
                opacity: "1",
              },
            },
          };
        },
      },
    },
  },
  presets: [typographyPreset(), pandaPreset],
  conditions: {
    extend: {
      supportsScroll: "@supports (animation-timeline: scroll())",
      notSupportsScroll: "@supports not (animation-timeline: scroll())",
      supportsLinear: "@supports (animation-timing-function: linear(0, 1))",
      notSupportsLinear:
        "@supports not (animation-timing-function: linear(0, 1))",
      notFound: "&:where([data-not-found='true'])",
      error: "&:where([data-error='true'])",
      progress: "&:where([data-progress='true'])",
      notSupportsHover: "@media (hover: none)",
    },
  },
  globalCss: {
    html: {
      scrollbarGutter: "stable",
      scrollbarWidth: "thin",
      scrollBehavior: "smooth",
      containerType: "scroll-state",
      fontFamily: "var(--font-albert-sans)",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "var(--font-montserrat-alternates)",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
  minify: true,
});
