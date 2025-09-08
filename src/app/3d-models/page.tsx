import type { Metadata } from "next";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { SearchInput } from "@/features/models/components/SearchInput";
import { getModels } from "@/features/models/queries/models";
import { modelsSearchParamsCache } from "@/features/models/search-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: PageProps<"/3d-models">): Promise<Metadata> {
  const { query } = await modelsSearchParamsCache.parse(searchParams);

  const title = query ? `Search: ${query} | 3D Models` : "3D Models";
  const description = query
    ? `Search results for "${query}" in our 3D printing model collection.`
    : "Browse our collection of 3D printing models. Find STL files for your next project.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page({ searchParams }: PageProps<"/3d-models">) {
  const models = await getModels();
  const { query } = await modelsSearchParamsCache.parse(searchParams);

  const filteredModels = query
    ? models.filter(
        (model) =>
          model.name.toLowerCase().includes(query.toLowerCase()) ||
          model.description.toLowerCase().includes(query.toLowerCase()),
      )
    : models;

  return (
    <>
      <SearchInput />
      <ModelsGrid title="3D Models" models={filteredModels} />
    </>
  );
}
