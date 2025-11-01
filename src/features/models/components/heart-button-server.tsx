"use server";

import { connection } from "next/server";
import { auth } from "@/lib/auth";
import type { toggleLike } from "../actions/likes";
import { getLikeStatusOfModel } from "../queries/get-model-with-like-status";
import HeartButtonClient from "./heart-button-client";

type HeartButtonServerProps = {
  modelSlug: string;
  toggleAction: typeof toggleLike;
};

export async function HeartButtonServer({
  modelSlug,
  toggleAction,
}: HeartButtonServerProps) {
  // Use connection() to make this component dynamic at runtime
  // This allows us to access authentication data
  await connection();

  const session = await auth();
  const userId = session?.user?.id;
  const isAuthenticated = !!session;
  const { hasLiked, likesCount } = await getLikeStatusOfModel(
    modelSlug,
    userId,
  );

  return (
    <HeartButtonClient
      hasLiked={hasLiked}
      isAuthenticated={isAuthenticated}
      likesCount={likesCount}
      modelSlug={modelSlug}
      toggleAction={toggleAction}
      userId={userId}
    />
  );
}
