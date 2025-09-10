import { Suspense } from "react";
import { getModelWithLikeStatus } from "@/features/models/queries/get-model-with-like-status";
import { auth } from "@/lib/auth";
import HeartButton from "./HeartButton";

interface LikeStatusProps {
  modelId: number;
  likesCount: number; // Pass the like count from the parent component
}

// Server component that fetches auth and like status
async function LikeStatusContent({ modelId, likesCount }: LikeStatusProps) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const modelWithLike = await getModelWithLikeStatus(modelId, userId);

    return (
      <HeartButton
        modelId={modelWithLike.id}
        hasLiked={modelWithLike.hasLiked}
        likesCount={modelWithLike.likes}
        isAuthenticated={!!session}
      />
    );
  } catch {
    // During static generation, auth() may not be available
    // Fall back to showing just the like count without auth state

    return (
      <HeartButton
        modelId={modelId}
        hasLiked={false}
        likesCount={likesCount}
        isAuthenticated={false}
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
      modelId={modelId}
      hasLiked={false}
      likesCount={likesCount}
      isAuthenticated={false}
    />
  );
}

// Main component with Suspense boundary
export default function LikeStatus({ modelId, likesCount }: LikeStatusProps) {
  // Check if we're in a static generation context
  // If so, render the static version directly
  if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
    // During static generation, render the static version
    return <StaticLikeStatus modelId={modelId} likesCount={likesCount} />;
  }
  return (
    <Suspense fallback={<LikeStatusSkeleton likesCount={likesCount} />}>
      <LikeStatusContent modelId={modelId} likesCount={likesCount} />
    </Suspense>
  );
}
