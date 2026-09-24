import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Panda styled-system uses named exports in flat *.mjs files (e.g. patterns/square.mjs).
  // modularizeImports rewrites to default imports and breaks (gridItem vs grid-item.mjs too).
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  experimental: {
    cachedNavigations: true,
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
    // Canary production defaults. Stable 16.4 pins both off, so set them
    // explicitly before that drop.
    turbopackMangleExportNames: true,
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
