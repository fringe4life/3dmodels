import HasAuth from "@/components/has-auth";
import { getLikeStatusOfModel } from "../queries/get-model-with-like-status";
import HeartButtonClient, {
  type HeartButtonClientProps,
} from "./heart-button-client";
import HeartButtonSkeleton from "./heart-button-skeleton";

type HeartButtonAuthProps = Omit<
  HeartButtonClientProps,
  "slug" | "toggleAction"
>;

type HeartButtonAdditionalProps = Pick<
  HeartButtonClientProps,
  "slug" | "toggleAction"
>;

export function HeartButtonServer({
  slug,
  toggleAction,
}: HeartButtonAdditionalProps) {
  return (
    <HasAuth<HeartButtonAuthProps, HeartButtonAdditionalProps>
      additionalProps={{ slug, toggleAction }}
      Component={HeartButtonClient}
      fallback={<HeartButtonSkeleton />}
      processUser={async (session, isAuthenticated, { slug: modelSlug }) => {
        const userId = session?.user?.id ?? null;
        const { hasLiked, likesCount } = await getLikeStatusOfModel(
          modelSlug,
          userId ?? undefined,
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
