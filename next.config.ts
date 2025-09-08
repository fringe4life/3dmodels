import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    // devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
    ppr: 'incremental',
    useCache: true,
  },
};

export default nextConfig;
