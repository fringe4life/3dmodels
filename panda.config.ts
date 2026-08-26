import { defineConfig } from "@pandacss/dev";
import presetBase from "@pandacss/preset-base";
import pandaPreset from "@pandacss/preset-panda";
import { typographyPreset } from "@pandacss/preset-typography";

export default defineConfig({
  conditions: {
    extend: {
      error: "&:where([data-error='true'])",
      notFound: "&:where([data-not-found='true'])",
      notSupportsHover: "@media (hover: none)",
      notSupportsLinear:
        "@supports not (animation-timing-function: linear(0, 1))",
      notSupportsScroll: "@supports not (animation-timeline: scroll())",
      progress: "&:where([data-progress='true'])",
      supportsLinear: "@supports (animation-timing-function: linear(0, 1))",
      supportsScroll: "@supports (animation-timeline: scroll())",
    },
  },
  // Files to exclude
  exclude: [],
  globalCss: {
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "var(--font-montserrat)",
    },
    html: {
      containerType: "scroll-state",
      fontFamily: "var(--font-albert-sans)",
      scrollBehavior: "smooth",
      scrollbarGutter: "stable",
      scrollbarWidth: "thin",
    },
  },

  // Where to look for your css declarations
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

  // The output directory for your css system
  outdir: "styled-system",
  // In panda.config.ts → theme.extend.semanticTokens

  patterns: {
    extend: {
      between: {
        description:
          "creates a flex container, aligns items center and justifies between",
        transform({ properties }) {
          return {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
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
            _after: {
              boxShadow: shadow,
              content: '""',
              inset: "0",
              opacity: "0",
              position: "absolute",
              rounded: "inherit",
              transitionDuration: "normal",
              transitionProperty: "opacity",
              zIndex: -1,
            },
            _hover: {
              _after: {
                opacity: "1",
              },
            },
            position: "relative",
          };
        },
      },
    },
  },
  // Whether to use css reset
  preflight: true,
  presets: [presetBase, pandaPreset, typographyPreset()],

  // Useful for theme customization
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
      keyframes: {
        /** View-timeline enter/exit on narrow viewports (see `ModelCard`) */
        animateModelIn: {
          "20%": { opacity: "0", translate: "0 25%" },
          "100%": { opacity: "1", translate: "0 0" },
        },
        animateModelOut: {
          from: { opacity: "1", translate: "0 0" },
          to: { opacity: "0", translate: "0 -25%" },
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
        /** Sticky main header: elevates on page scroll (see `Navbar`) */
        navAnimation: {
          to: {
            borderRadius: "100dvw",
            boxShadow:
              "0 1px 2px token(colors.gray.300/0.2), 0 2px 4px token(colors.black/0.2), 0 4px 8px token(colors.black/0.1)",
            translate: "0 8px",
          },
        },
        navProgressFill: {
          to: { transform: "scaleX(1)" },
        },
        /** Scroll-linked nav reading bar (see `ScrollProgress`) */
        navProgressReveal: {
          to: { opacity: 1 },
        },
        /** Loading placeholder highlight sweeps across the skeleton surface */
        skeletonShimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        "slide-in": {
          from: {
            translate: "var(--slide-distance)",
          },
          to: {
            translate: "0 0",
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
        "slide-out": {
          from: {
            translate: "0 0",
          },
          to: {
            translate: "var(--slide-distance)",
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
      },
      tokens: {
        blurs: {
          "2xs": { value: "2px" },
        },
        colors: {
          orangeAccent: { value: "oklch(71.85% 0.17 47.43)" },
          searchInput: { value: "oklch(48.91% 0 0)" },
        },
        easings: {
          glide: {
            value:
              "linear(0, 0.012 0.9%, 0.05 2%, 0.411 9.2%, 0.517 11.8%, 0.611 14.6%, 0.694 17.7%, 0.765 21.1%, 0.824 24.8%, 0.872 28.9%, 0.91 33.4%, 0.939 38.4%, 0.977 50.9%, 0.994 68.4%, 1)",
          },
          inDramatic: {
            value:
              "linear(0, -0.009 21.1%, -0.028 28.1%, -0.059 34.3%, -0.108 40.5%, -0.174 46.6%, -0.421 63.6%, -0.481 68.5%, -0.514 73.8%, -0.512 76.1%, -0.497 78.3%, -0.446 81.6%, -0.358 84.7%, -0.072 90.3%, 0.382 95.4%, 1)",
          },
          outDramatic: {
            value:
              "linear(0, 0.618 4.6%, 1.072 9.7%, 1.358 15.3%, 1.446 18.4%, 1.497 21.7%, 1.512 23.9%, 1.514 26.2%, 1.481 31.5%, 1.421 36.4%, 1.174 53.4%, 1.108 59.5%, 1.059 65.7%, 1.028 71.9%, 1.009 78.9%, 1)",
          },
          smoothInOut: {
            value:
              "linear(0, -0.01 4.8%, -0.044 9.4%, -0.226 23.1%, -0.271 27.7%, -0.28 30.1%, -0.276 32.4%, -0.227 36.6%, -0.108 40.8%, 0.083 44.7%, 0.76 53%, 1.006 56.9%, 1.175 61.2%, 1.229 63.5%, 1.264 65.9%, 1.28 69.3%, 1.265 73.1%, 1.224 77.1%, 1.044 90.6%, 1.01 95.2%, 1)",
          },
          soft: {
            value:
              "linear(0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%, 1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%, 1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1)",
          },
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
      },
    },
    semanticTokens: {
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
    },
  },
  utilities: {
    extend: {
      cornerShape: {
        group: "Border Radius",
        transform(value) {
          return { cornerShape: value };
        },
        values: ["squircle", "bevel"],
      },
    },
  },
});
