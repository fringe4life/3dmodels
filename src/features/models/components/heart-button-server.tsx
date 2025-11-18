import HasAuth from "@/components/has-auth";
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
    <HasAuth
      additionalProps={{ slug, toggleAction }}
      Component={HeartButtonClient}
      fallback={<HeartButtonSkeleton />}
      processUser={async (session, isAuthenticated) => {
        const userId = session?.user?.id;
        const { hasLiked, likesCount } = await getLikeStatusOfModel(
          slug,
          userId,
        );
        return {
          isAuthenticated,
          userId,
          hasLiked,
          likesCount,
        };
      }}
    />
  );
}
