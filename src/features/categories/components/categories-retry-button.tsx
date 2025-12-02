"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { revalidateCategoriesAction } from "@/features/categories/actions/revalidate-categories";

const CategoriesRetryButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(async () => {
      await revalidateCategoriesAction();
      router.refresh();
    });
  };

  return (
    <button
      className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isPending}
      onClick={handleRetry}
      type="button"
    >
      {isPending ? "Retrying..." : "Retry"}
    </button>
  );
};

export default CategoriesRetryButton;
