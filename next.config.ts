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
  reactCompiler: !isDev,
  cacheComponents: true,
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    viewTransition: true,
    mcpServer: true,
    typedEnv: true,
    // seems to make the dev server hang
    optimizePackageImports: isDev ? undefined : ["valibot"],
    cachedNavigations: true,
    appNewScrollHandler: true,
  },
  logging: {
    browserToTerminal: true,
  },
};

export default nextConfig;
