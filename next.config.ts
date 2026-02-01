import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: !isDev,
  cacheComponents: true,
  experimental: {
    browserDebugInfoInTerminal: true,
    viewTransition: true,
    mcpServer: true,
    typedEnv: true,
    // seems to make the dev server hang
    // optimizePackageImports: ["valibot"],
  },
};

export default nextConfig;
