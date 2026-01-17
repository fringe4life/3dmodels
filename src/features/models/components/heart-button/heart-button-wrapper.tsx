"use client";

import { Suspend } from "@/components/suspend";
import { HeartButtonSkeleton } from "@/features/models/components/heart-button/heart-button-skeleton";
import type { HeartButtonWrapperProps } from "@/features/models/types";
import { HeartButtonContent } from "./heart-button-content";

const HeartButtonWrapper = (props: HeartButtonWrapperProps) => (
  <Suspend fallback={<HeartButtonSkeleton />}>
    <HeartButtonContent {...props} />
  </Suspend>
);

export { HeartButtonWrapper };
