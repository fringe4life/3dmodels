import { connection } from "next/server";
import { hasAuth } from "@/dal/auth-helpers";
import { getLikeStatusOfModel } from "@/features/models/queries/get-model-with-like-status";
import HeartButtonClient from "./heart-button-client";

type HeartButtonProps = {
  modelId: number;
};

export default async function HeartButton({ modelId }: HeartButtonProps) {
  await connection();

  return await hasAuth(async ({ userId, isAuthenticated }) => {
    const { hasLiked, likesCount } = await getLikeStatusOfModel(
      modelId,
      userId,
    );

    return (
      <HeartButtonClient
        hasLiked={hasLiked}
        isAuthenticated={isAuthenticated}
        likesCount={likesCount}
        modelId={modelId}
        userId={userId}
      />
    );
  });
}
