import type { MetadataRoute } from "next";
import { getAllCategorySlugs } from "@/features/categories/queries/get-all-category-slugs";
import { getAllModelSlugs } from "@/features/models/queries/get-all-model-slugs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [modelSlugs, categoryRows] = await Promise.all([
    getAllModelSlugs(),
    getAllCategorySlugs(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/3d-models`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const modelEntries: MetadataRoute.Sitemap = (modelSlugs ?? []).map(
    ({ slug }) => ({
      url: `${baseUrl}/3d-models/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = categoryRows.map(
    ({ categoryName }) => ({
      url: `${baseUrl}/3d-models/categories/${categoryName}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...modelEntries, ...categoryEntries];
}
