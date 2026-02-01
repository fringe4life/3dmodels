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
    optimizePackageImports: isDev ? undefined : ["valibot"],
  },
};

export default nextConfig;
