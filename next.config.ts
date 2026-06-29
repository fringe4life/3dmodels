import { varlockNextConfigPlugin } from "@varlock/nextjs-integration/plugin";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  typedRoutes: true,
  cacheComponents: true,
  reactCompiler: true,
  partialPrefetching: true,
  // Panda styled-system uses named exports in flat *.mjs files (e.g. patterns/square.mjs).
  // modularizeImports rewrites to default imports and breaks (gridItem vs grid-item.mjs too).
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    viewTransition: true,
    mcpServer: true,
    // Env types: Varlock `.env.schema` + `src/env.d.ts` (not Next typedEnv)
    // seems to make the dev server hang
    optimizePackageImports: isDev ? undefined : ["valibot"],
    cachedNavigations: true,
    appNewScrollHandler: true,
    turbopackRustReactCompiler: true,
  },
  logging: {
    browserToTerminal: true,
  },
};

export default varlockNextConfigPlugin()(nextConfig);
