import { css } from "@styled-system/css";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { Suspend } from "@/components/suspend";
import { ModelBackLink } from "@/features/models/back-link/model-back-link";
import { ModelBackLinkSkeleton } from "@/features/models/back-link/model-back-link-skeleton";
import { ModelDetail } from "@/features/models/components/model-detail";
import { MODEL_NOT_FOUND } from "@/features/models/constants";
import { toggleLike } from "@/features/models/likes/actions/toggle-like";
import { HeartButtonServer } from "@/features/models/likes/components/heart-button-server";
import { getAllModelSlugs } from "@/features/models/queries/get-all-model-slugs";
import { getModelBySlug } from "@/features/models/queries/get-model-by-slug";
import { PLACEHOLDER_IMAGE_SRC } from "@/lib/placeholder-image";

// fallow-ignore-next-line
export const instant = false;

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
    description,
    openGraph: {
      description,
      images: [
        {
          alt: `3D model of ${title}`,
          height: 630,
          url: image || PLACEHOLDER_IMAGE_SRC,
          width: 1200,
        },
      ],
      title,
      type: "article",
    },
    title,
  };
};

const ModelDetailPage = async ({
  params,
  searchParams,
}: PageProps<"/3d-models/[slug]">) => {
  const { slug } = await params;

  const model = await getModelBySlug(slug);

  if (!model) {
    throw notFound();
  }

  return (
    <ModelDetail
      {...model}
      header={
        <div
          className={css({
            blockSize: 8,
            marginBlockEnd: 4,
          })}
        >
          <Suspend fallback={<ModelBackLinkSkeleton />} name="model-back-link">
            <ModelBackLink searchParams={searchParams} />
          </Suspend>
        </div>
      }
    >
      <HeartButtonServer
        likes={model.likes}
        slug={slug}
        toggleAction={toggleLike}
      />
    </ModelDetail>
  );
};

export default ModelDetailPage;
