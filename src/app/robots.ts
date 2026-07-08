import type { MetadataRoute } from "next";
import { ENV } from "varlock/env";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    allow: "/",
    disallow: ["/api/", "/signin", "/signup"],
    userAgent: "*",
  },
  sitemap: ENV.NEXT_PUBLIC_SITE_URL
    ? `${ENV.NEXT_PUBLIC_SITE_URL}/sitemap.xml`
    : undefined,
});

export default robots;
