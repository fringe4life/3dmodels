import type { Configuration } from "lint-staged";

const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["bun fix"],
  // Function form = once per commit (not once per file). --staged = git index only.
  "*.{ts,tsx}": () => [
    "bun run type",
    "bun run react-doctor:staged",
    "bun run test",
  ],
} satisfies Configuration;

export default config;
