import { cx } from "@styled-system/css";
import type { Route } from "next";
import Link from "next/link";
import type { SearchParams } from "nuqs/server";
import { FaArrowLeft } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";
import { buttonRecipe } from "@/components/button-recipe";
import { resolveBackHref } from "./from-search-params";

interface ModelBackLinkProps {
  searchParams: Promise<SearchParams>;
}

const ModelBackLink = async ({ searchParams }: ModelBackLinkProps) => {
  const href: Route = await resolveBackHref(searchParams);

  return (
    <Link
      className={cx(
        "group",
        buttonRecipe({ density: "compact", size: "sm", variant: "ghost" }),
      )}
      href={href}
      // Runtime prefetch: listing searchParams aren't in App Shell under partialPrefetching
      prefetch
    >
      <FaArrowLeft
        aria-hidden="true"
        className={arrowRecipe({
          direction: "left",
          distance: "compact",
          size: "sm",
        })}
      />
      Back
    </Link>
  );
};

export { ModelBackLink };
