import type { Route } from "next";
import Link from "next/link";
import type { SearchParams } from "nuqs/server";
import { FaArrowLeft } from "react-icons/fa6";
import { buttonRecipe } from "@/components/button-recipe";
import { resolveBackHref } from "./from-search-params";

interface ModelBackLinkProps {
  searchParams: Promise<SearchParams>;
}

const ModelBackLink = async ({ searchParams }: ModelBackLinkProps) => {
  const href: Route = await resolveBackHref(searchParams);

  return (
    <Link
      className={buttonRecipe({ size: "sm", variant: "ghost" })}
      href={href}
      // Runtime prefetch: listing searchParams aren't in App Shell under partialPrefetching
      prefetch={true}
    >
      <FaArrowLeft aria-hidden />
      Back
    </Link>
  );
};

export { ModelBackLink };
