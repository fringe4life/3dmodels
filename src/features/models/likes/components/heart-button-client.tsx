"use client";

import { cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import Link from "next/link";
import { ViewTransition } from "react";
import { FaHeart } from "react-icons/fa6";
import { buttonRecipe } from "@/components/button-recipe";
import { FieldError } from "@/components/form/field-errors";
import { HeartButtonCount } from "@/features/models/likes/components/heart-button-count";
import { useHeartLike } from "@/features/models/likes/hooks/use-heart-like";
import type {
  HasLiked,
  HeartButtonAdditionalProps,
} from "@/features/models/likes/types";
import type { IsAuthenticated } from "@/lib/auth/types";
import type { Prettify } from "@/types";
import { sanitiseName } from "@/utils/sanitise-name";
import {
  heartAnchorStyle,
  heartButtonRecipe,
  heartGuestHintTriggerClassName,
  heartGuestRootClassName,
} from "./heart-button-recipe";
import { HeartSignInHint } from "./heart-sign-in-hint";

export type HeartButtonClientProps = Prettify<
  HeartButtonAdditionalProps & HasLiked & IsAuthenticated
>;

const HeartButtonClient = ({
  hasLiked,
  isAuthenticated,
  likes,
  slug,
  toggleAction,
  disableTransition,
}: HeartButtonClientProps) => {
  const {
    handleSubmit,
    isDisabled,
    isPending,
    optimistic,
    state,
    visualState,
  } = useHeartLike({
    hasLiked,
    isAuthenticated,
    likes,
    slug,
    toggleAction,
  });

  const heartControlClassName = cx(
    buttonRecipe({ size: "bare", variant: "ghost" }),
    heartButtonRecipe({ guest: !isAuthenticated, visual: visualState }),
    isAuthenticated ? undefined : heartGuestHintTriggerClassName,
  );

  const glyph = (
    <>
      <FaHeart aria-hidden="true" className={square({ size: 6 })} />
      <HeartButtonCount likes={optimistic.likes} />
    </>
  );

  const content = isAuthenticated ? (
    <form data-progress={isPending} onSubmit={handleSubmit}>
      <button
        aria-label="Like this model"
        className={heartControlClassName}
        disabled={isDisabled}
        type="submit"
      >
        {glyph}
      </button>
      <FieldError actionState={state} name="slug" />
    </form>
  ) : (
    <span className={heartGuestRootClassName} style={heartAnchorStyle(slug)}>
      <Link
        aria-label="Sign in to like this model"
        className={heartControlClassName}
        href="/signin"
      >
        {glyph}
      </Link>
      <HeartSignInHint slug={slug} />
    </span>
  );

  if (disableTransition) {
    return content;
  }

  return (
    <ViewTransition name={`model-heart-${sanitiseName(slug)}`}>
      {content}
    </ViewTransition>
  );
};

export { HeartButtonClient };
