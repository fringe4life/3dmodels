import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
    browserDebugInfoInTerminal: true,
    viewTransition: true,
    mcpServer: true,
  },
};

export default nextConfig;
