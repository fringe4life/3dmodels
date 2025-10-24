import type { Configuration } from "lint-staged";

const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["bun x ultracite fix"],
} satisfies Configuration;

export default config;
