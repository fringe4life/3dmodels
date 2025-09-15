import Stream from "@/components/streamable";
import { getModelWithLikeStatus } from "@/features/models/queries/get-model-with-like-status";
import { auth } from "@/lib/auth";
import HeartButton from "./heart-button";

type LikeStatusProps = {
  modelId: number;
  likesCount: number; // Pass the like count from the parent component
};

// Server component that fetches auth and like status
async function LikeStatusContent({ modelId, likesCount }: LikeStatusProps) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const modelWithLike = await getModelWithLikeStatus(modelId, userId);

    return (
      <HeartButton
        hasLiked={modelWithLike.hasLiked}
        isAuthenticated={!!session}
        likesCount={modelWithLike.likes}
        modelId={modelWithLike.id}
      />
    );
  } catch {
    // During static generation, auth() may not be available
    // Fall back to showing just the like count without auth state

    return (
      <HeartButton
        hasLiked={false}
        isAuthenticated={false}
        likesCount={likesCount}
        modelId={modelId}
      />
    );
  }
}

// Loading skeleton for the like status
function LikeStatusSkeleton({ likesCount }: { likesCount: number }) {
  return (
    <div className="flex items-center">
      <div className="mr-1 h-5 w-5 animate-pulse rounded bg-gray-200" />
      <span>{likesCount}</span>
    </div>
  );
}

// Static fallback component for use during static generation
function StaticLikeStatus({ modelId, likesCount }: LikeStatusProps) {
  return (
    <HeartButton
      hasLiked={false}
      isAuthenticated={false}
      likesCount={likesCount}
      modelId={modelId}
    />
  );
}

// Main component with Stream boundary
export default function LikeStatus({ modelId, likesCount }: LikeStatusProps) {
  // Check if we're in a static generation context
  // If so, render the static version directly
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    // During static generation, render the static version
    return <StaticLikeStatus likesCount={likesCount} modelId={modelId} />;
  }

  // Create a promise for the like status data
  const likeStatusPromise = (async () => {
    const session = await auth();
    const userId = session?.user?.id;
    return { modelId, likesCount, userId };
  })();

  return (
    <Stream
      fallback={<LikeStatusSkeleton likesCount={likesCount} />}
      value={likeStatusPromise}
    >
      {(data) => (
        <LikeStatusContent
          likesCount={data.likesCount}
          modelId={data.modelId}
        />
      )}
    </Stream>
  );
}
