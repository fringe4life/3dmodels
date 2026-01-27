import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    // turbopackFileSystemCacheForDev: true,
    browserDebugInfoInTerminal: true,
    viewTransition: true,
    mcpServer: true,
    typedEnv: true,
    // seems to make the dev server hang
    // optimizePackageImports: ["valibot"],
  },
};

export default nextConfig;
