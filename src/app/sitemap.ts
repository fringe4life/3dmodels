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
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/3d-models`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const modelEntries: MetadataRoute.Sitemap = (modelSlugs ?? []).map(
    ({ slug }) => ({
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/3d-models/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = categoryRows.map(
    ({ categoryName }) => ({
      url: `${ENV.NEXT_PUBLIC_SITE_URL}/3d-models/categories/${categoryName}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...modelEntries, ...categoryEntries];
};

export default sitemap;
