import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { ModelDetail } from "@/features/models/components/model-detail";
import { MODEL_NOT_FOUND } from "@/features/models/constants";
import { toggleLike } from "@/features/models/likes/actions/toggle-like";
import { HeartButtonServer } from "@/features/models/likes/components/heart-button-server";
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
  const { name: title, description, image } = model;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: image || "/img/placeholder.png",
          width: 1200,
          height: 630,
          alt: `3D model of ${title}`,
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

  return (
    <ModelDetail {...model}>
      <HeartButtonServer
        likes={model.likes}
        slug={slug}
        toggleAction={toggleLike}
      />
    </ModelDetail>
  );
};

export default ModelDetailPage;
