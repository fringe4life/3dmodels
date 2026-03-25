import "server-only";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { HeartButtonSkeleton } from "@/features/models/components/heart-button/heart-button-skeleton";
import { getHasLikedStatus } from "@/features/models/queries/get-model-with-like-status";
import type { HeartButtonAdditionalProps } from "@/features/models/types";
import { DEFAULT_HAS_LIKED } from "../../constants";
import { HeartButtonClient } from "./heart-button-client";

const HeartButtonServer = ({
  slug,
  likes,
  toggleAction,
}: HeartButtonAdditionalProps) => (
  <HasAuthSuspense fallback={<HeartButtonSkeleton />}>
    {async (user, isAuthenticated) => {
      const { hasLiked } = user?.id
        ? await getHasLikedStatus(slug, user.id)
        : DEFAULT_HAS_LIKED;
      return (
        <HeartButtonClient
          hasLiked={hasLiked}
          isAuthenticated={isAuthenticated}
          likes={likes}
          slug={slug}
          toggleAction={toggleAction}
        />
      );
    }}
  </HasAuthSuspense>
);

export { HeartButtonServer };
