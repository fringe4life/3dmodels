import type { MetadataRoute } from "next";
import { ENV } from "varlock/env";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/signin", "/signup"],
  },
  sitemap: ENV.NEXT_PUBLIC_SITE_URL
    ? `${ENV.NEXT_PUBLIC_SITE_URL}/sitemap.xml`
    : undefined,
});

export default robots;
