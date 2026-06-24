import "server-only";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { DEFAULT_HAS_LIKED } from "../constants";
import { getHasLikedStatus } from "../queries/like-status";
import type { HeartButtonAdditionalProps } from "../types";
import { HeartButtonClient } from "./heart-button-client";
import { HeartButtonSkeleton } from "./heart-button-skeleton";

const HeartButtonServer = ({
  slug,
  likes,
  toggleAction,
}: HeartButtonAdditionalProps) => (
  <HasAuthSuspense fallback={<HeartButtonSkeleton />}>
    {async (auth) => {
      const { hasLiked } = auth.isAuthenticated
        ? await getHasLikedStatus(slug, auth.user.id)
        : DEFAULT_HAS_LIKED;
      return (
        <HeartButtonClient
          hasLiked={hasLiked}
          isAuthenticated={auth.isAuthenticated}
          likes={likes}
          slug={slug}
          toggleAction={toggleAction}
        />
      );
    }}
  </HasAuthSuspense>
);

export { HeartButtonServer };
