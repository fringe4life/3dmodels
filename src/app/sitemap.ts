import type { MetadataRoute } from "next";
import { ENV } from "varlock/env";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getAllModelSlugs } from "@/features/models/queries/get-all-model-slugs";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [modelSlugs, categoryRows] = await Promise.all([
    getAllModelSlugs(),
    getAllCategorySlugs(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 1,
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/`,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.8,
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/about`,
    },
    {
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 0.9,
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/3d-models`,
    },
  ];

  const modelEntries: MetadataRoute.Sitemap = (modelSlugs ?? []).map(
    ({ slug }) => ({
      changeFrequency: "weekly" as const,
      lastModified: new Date(),
      priority: 0.8,
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/3d-models/${slug}`,
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = categoryRows.map(
    ({ categoryName }) => ({
      changeFrequency: "weekly" as const,
      lastModified: new Date(),
      priority: 0.7,
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/3d-models/categories/${categoryName}`,
    }),
  );

  return [...staticEntries, ...modelEntries, ...categoryEntries];
};

export default sitemap;
