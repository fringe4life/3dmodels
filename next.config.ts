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
    turbopackFileSystemCacheForBuild: true,
    turbopackFileSystemCacheForDev: true,
    turbopackRustReactCompiler: true,
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
