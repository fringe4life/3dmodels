import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import HeartButtonClient, {
  type HeartButtonClientProps,
} from "@/features/models/components/heart-button-client";
import HeartButtonSkeleton from "@/features/models/components/heart-button-skeleton";
import {
  getHasLikedStatus,
  getLikesCount,
} from "@/features/models/queries/get-model-with-like-status";

type HeartButtonAdditionalProps = Pick<
  HeartButtonClientProps,
  "slug" | "toggleAction"
>;

const HeartButtonServer = ({
  slug,
  toggleAction,
}: HeartButtonAdditionalProps) => (
  <HasAuthSuspense fallback={<HeartButtonSkeleton />}>
    {async (session, isAuthenticated) => {
      const userId = session?.user?.id;
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

export default HeartButtonServer;
