import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    // devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
    useCache: true,
    cacheComponents: true,
  },
};

export default nextConfig;
