import "server-only";

// CLI loads `auth.config.ts` (no server-only). App imports this module for the RSC boundary.
// biome-ignore lint/performance/noBarrelFile: thin server-only re-export for Better Auth CLI compatibility
export { auth } from "./auth.config";
