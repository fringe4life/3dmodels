import "server-only";
import { ViewTransition } from "react";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { sanitiseName } from "@/utils/sanitise-name";
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
  <ViewTransition name={`model-heart-${sanitiseName(slug)}`}>
    <HasAuthSuspense fallback={<HeartButtonSkeleton />}>
      {async (auth) => {
        const { hasLiked } = auth.isAuthenticated
          ? await getHasLikedStatus(slug, auth.user.id)
          : DEFAULT_HAS_LIKED;
        return (
          <HeartButtonClient
            disableTransition={true}
            hasLiked={hasLiked}
            isAuthenticated={auth.isAuthenticated}
            likes={likes}
            slug={slug}
            toggleAction={toggleAction}
          />
        );
      }}
    </HasAuthSuspense>
  </ViewTransition>
);

export { HeartButtonServer };
