import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import ModelDetail from "@/features/models/components/model-detail";
import { MODEL_NOT_FOUND } from "@/features/models/constants";
import { getAllModelSlugs } from "@/features/models/queries/get-all-model-slugs";
import { getModelBySlug } from "@/features/models/queries/get-model-by-slug";

export const generateStaticParams = async () => await getAllModelSlugs();

export const generateMetadata = async ({
  params,
}: PageProps<"/3d-models/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const model = await getModelBySlug(slug);

  if (!model) {
    return MODEL_NOT_FOUND;
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
};

const ModelDetailPage = async ({ params }: PageProps<"/3d-models/[slug]">) => {
  const { slug } = await params;

  const model = await getModelBySlug(slug);

  if (!model) {
    throw notFound();
  }

  return <ModelDetail {...model} />;
};

export default ModelDetailPage;
