import "server-only";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { HeartButtonSkeleton } from "@/features/models/components/heart-button/heart-button-skeleton";
import { getHasLikedStatus } from "@/features/models/queries/get-model-with-like-status";
import type { HeartButtonAdditionalProps } from "@/features/models/types";
import { HeartButtonContent } from "./heart-button-content";

const HeartButtonServer = (props: HeartButtonAdditionalProps) => (
  <HasAuthSuspense fallback={<HeartButtonSkeleton />}>
    {async (user, _) => {
      const hasLikedResult = user?.id
        ? await getHasLikedStatus(props.slug, user.id)
        : { slug: props.slug, hasLiked: false };
      return (
        <HeartButtonContent
          hasLiked={hasLikedResult.hasLiked}
          likes={props.likes}
          slug={props.slug}
          toggleAction={props.toggleAction}
        />
      );
    }}
  </HasAuthSuspense>
);

export { HeartButtonServer };
