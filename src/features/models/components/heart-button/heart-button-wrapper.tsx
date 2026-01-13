"use client";

import { Suspense } from "react";
import { HeartButtonSkeleton } from "@/features/models/components/heart-button/heart-button-skeleton";
import type {
  HasLiked,
  HeartButtonAdditionalProps,
} from "@/features/models/types";
import { HeartButtonContent } from "./heart-button-content";

interface HeartButtonWrapperProps extends HeartButtonAdditionalProps {
  hasLikedPromise: Promise<HasLiked>;
}

const HeartButtonWrapper = (props: HeartButtonWrapperProps) => (
  <Suspense fallback={<HeartButtonSkeleton />}>
    <HeartButtonContent {...props} />
  </Suspense>
);

export { HeartButtonWrapper };
