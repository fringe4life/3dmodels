import type { Metadata } from "next";
import Form from "next/form";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { getModels } from "@/features/models/queries/models";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: PageProps<"/3d-models">): Promise<Metadata> {
  const queryParam = (await searchParams)?.query;
  const query = Array.isArray(queryParam)
    ? queryParam[0]?.toLowerCase() || ""
    : queryParam?.toLowerCase() || "";

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
  const queryParam = (await searchParams)?.query;
  const query = Array.isArray(queryParam)
    ? queryParam[0]?.toLowerCase() || ""
    : queryParam?.toLowerCase() || "";

  const filteredModels = query
    ? models.filter(
        (model) =>
          model.name.toLowerCase().includes(query) ||
          model.description.toLowerCase().includes(query),
      )
    : models;

  return (
    <>
      <Form action="/3d-models" className="w-full px-5 md:max-w-xl md:px-0">
        <input
          type="text"
          name="query"
          placeholder="E.g. dragon"
          autoComplete="off"
          defaultValue={query}
          className="w-full rounded-full border border-[#606060] bg-white py-3 pr-5 pl-5 text-sm placeholder-gray-500 focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
        />
      </Form>
      <ModelsGrid title="3D Models" models={filteredModels} />
    </>
  );
}
