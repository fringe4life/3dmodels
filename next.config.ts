import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Panda styled-system uses named exports in flat *.mjs files (e.g. patterns/square.mjs).
  // modularizeImports rewrites to default imports and breaks (gridItem vs grid-item.mjs too).
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  experimental: {
    cachedNavigations: true,
    // Instant() e2e against `next start` needs this (auto-on in `next dev`).
    // Build with EXPOSE_TESTING_API=1 for prod e2e; do not enable on public deploys.
    exposeTestingApiInProductionBuild: process.env.EXPOSE_TESTING_API === "1",
    mcpServer: true,
    // Env types: Varlock `.env.schema` + `src/env.d.ts` (not Next typedEnv)
    optimizePackageImports: ["valibot"],
    // Unmerged pieces beside each merged chunk, so a later page can fetch
    // what it is missing instead of downloading the merged file again.
    // https://github.com/fringe4life/3dmodels/issues/109
    turbopackChunking: {
      generateComponentChunks: true,
    },
    turbopackFileSystemCacheForBuild: true,
    turbopackFileSystemCacheForDev: true,
    // Dev/cache only. Does not change production output.
    turbopackGc: true,
    // Dev only: compile client import() when the browser requests the chunk.
    turbopackLazyDynamicImports: true,
    // 16.4 defaults mangling on for production only, and only when this flag is
    // unset. Explicit `true` also enables namespace-facade mangling.
    turbopackMangleExportNames: true,
    // Do not set `forceWorkerThreads`. That bypasses Next's crash guard.
    /**
     * Workaround: set `workerThreads` even though Next rewrites it to
     * `childProcesses` on Node >= 24.13.1. The value should mean worker
     * threads; today it only logs a warning.
     *
     * @remarks
     * Still required on `next@16.4.0` with Node 24.21.0 (affected range
     * `>=24.13.1`). No Next.js bug. Next follows the Node teardown abort.
     * Drop this comment when Node ships a fix and `next` no longer warns or
     * rewrites the strategy. Re-verify before deleting. Keep the assignment.
     *
     * @see https://github.com/nodejs/node/issues/65100 — open
     * @see https://github.com/nodejs/node/pull/65967 — open, fix in flight
     * @see https://github.com/fringe4life/3dmodels/issues/135 — tracking
     */
    turbopackPluginRuntimeStrategy: "workerThreads",
    turbopackRustReactCompiler: true,
    turbopackSharedRuntime: true,
    useOffline: true,
    // TypeScript 7 has no JS compiler API; next build uses project-local `tsc` instead
    useTypeScriptCli: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
  logging: {
    browserToTerminal: true,
  },
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
};

export default varlockNextConfigPlugin()(nextConfig);
