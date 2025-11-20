import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import ModelDetail from "@/features/models/components/model-detail";
import { getAllModelSlugs } from "@/features/models/queries/get-all-model-slugs";
import { getModelBySlug } from "@/features/models/queries/get-model-by-slug";

export async function generateStaticParams() {
  return await getAllModelSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/3d-models/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const model = await getModelBySlug(slug);

  if (!model) {
    return notFound();
  }

  const { name, description } = model;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      type: "article",
      images: [
        {
          url: "/placeholder.png",
          width: 1200,
          height: 630,
          alt: `3D model of ${name}`,
        },
      ],
    },
  };
}

export default async function ModelDetailPage({
  params,
}: PageProps<"/3d-models/[slug]">) {
  const { slug } = await params;

  const model = await getModelBySlug(slug);

  if (!model) {
    return notFound();
  }

  return <ModelDetail {...model} />;
}
