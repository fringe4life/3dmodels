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
    typedEnv: true,
  },
  // TODO, drizzle seems to cause a lot of issues, also am quite new to redis
  // cacheHandlers: {
  //   default: require.resolve("./cache-handlers/default-handler.ts"),
  //   remote: require.resolve("./cache-handlers/remote-handler.ts"),
  // },
};

export default nextConfig;
