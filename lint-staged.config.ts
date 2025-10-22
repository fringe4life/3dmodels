import type { Configuration } from "lint-staged";

const config = {
  "*.{js,jsx,ts,tsx}": ["biome check --write --unsafe"],
  "*.{json,jsonc,md}": ["biome format --write"],
  "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": [
    "bun x ultracite fix",
    "bun x ultracite fix",
  ],
} satisfies Configuration;

export default config;
