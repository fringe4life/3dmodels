import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
