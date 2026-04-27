import type { MetadataRoute } from "next";
import { ENV } from "varlock/env";

const siteUrl = ENV.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/signin", "/signup"],
  },
  sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
});

export default robots;
