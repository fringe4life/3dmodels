import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { getLikeStatusOfModel } from "../queries/get-model-with-like-status";
import HeartButtonClient, {
  type HeartButtonClientProps,
} from "./heart-button-client";
import HeartButtonSkeleton from "./heart-button-skeleton";

type HeartButtonAdditionalProps = Pick<
  HeartButtonClientProps,
  "slug" | "toggleAction"
>;

export function HeartButtonServer({
  slug,
  toggleAction,
}: HeartButtonAdditionalProps) {
  return (
    <HasAuthSuspense fallback={<HeartButtonSkeleton />}>
      {async (session) => {
        const userId = session?.user?.id;
        const { hasLiked, likesCount } = await getLikeStatusOfModel(
          slug,
          userId,
        );
        return (
          <HeartButtonClient
            hasLiked={hasLiked}
            isAuthenticated={!!session?.user?.id}
            likesCount={likesCount}
            slug={slug}
            toggleAction={toggleAction}
          />
        );
      }}
    </HasAuthSuspense>
  );
}
