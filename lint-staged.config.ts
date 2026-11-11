import type { Configuration } from "lint-staged";

/** Once per commit when the lockfile or manifest is staged (not per file). */
const lockfileChecks = () => ["bun run deps:check"];

const config = {
  "*.{js,jsx,ts,tsx,json,jsonc,css,scss,md,mdx}": ["bun fix"],
  // Function form = once per commit (not once per file). --staged = git index only.
  "*.{ts,tsx}": () => [
    "bun run type",
    "bun run react-doctor:staged",
    "bun run test",
  ],
  // Dedupe + prod moderate+ audit when dependency graph may change.
  // `--prod` skips devDependency-only trees (lint tools do not ship).
  // Bun severity name is `moderate` (npm-style), not "medium".
  "bun.lock": lockfileChecks,
  "package.json": lockfileChecks,
} satisfies Configuration;

export default config;
