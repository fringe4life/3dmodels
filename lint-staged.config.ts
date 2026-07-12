import type { Configuration } from "lint-staged";

const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["bun fix"],
  // Function form = once per commit (not once per file). --staged = git index only.
  "*.{js,jsx,ts,tsx}": () => ["bun run react-doctor:staged"],
  "*.{ts,tsx}": () => ["bun run type"],
} satisfies Configuration;

export default config;
