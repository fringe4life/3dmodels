import type { Configuration } from "lint-staged";

const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["bun x ultracite fix"],
  "*.{ts,tsx}": () => ["bun run type"],
} satisfies Configuration;

export default config;
