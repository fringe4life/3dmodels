import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { HeartButtonClient } from "@/features/models/components/heart-button/heart-button-client";
import { HeartButtonSkeleton } from "@/features/models/components/heart-button/heart-button-skeleton";
import {
  getHasLikedStatus,
  getLikesCount,
} from "@/features/models/queries/get-model-with-like-status";
import type { HeartButtonAdditionalProps } from "@/features/models/types";

const HeartButtonServer = ({
  slug,
  toggleAction,
}: HeartButtonAdditionalProps) => (
  <HasAuthSuspense fallback={<HeartButtonSkeleton />}>
    {async (user, isAuthenticated) => {
      const userId = user?.id;
      const { likesCount } = await getLikesCount(slug);
      const hasLiked = userId
        ? (await getHasLikedStatus(slug, userId)).hasLiked
        : false;

      return (
        <HeartButtonClient
          hasLiked={hasLiked}
          isAuthenticated={isAuthenticated}
          likesCount={likesCount}
          slug={slug}
          toggleAction={toggleAction}
        />
      );
    }}
  </HasAuthSuspense>
);

export { HeartButtonServer };
