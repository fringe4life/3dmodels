import Link from "next/link";
import GenericComponent from "@/components/generic-component";
import UnsuccessfulState from "@/components/not-found/unsuccessful-state";
import {
  CATEGORY_LINKS,
  CATEGORY_LIST_ITEMS,
} from "@/features/categories/constants";
import type { UnsuccessfulStateLink } from "@/types";

const CategoryNotFound = () => (
  <UnsuccessfulState
    action={
      <GenericComponent
        as="div"
        Component={Link}
        className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        items={CATEGORY_LINKS}
        renderKey={(_, index) => index}
        renderProps={(item: UnsuccessfulStateLink) => ({
          href: item.href,
          className: `inline-flex items-center justify-center rounded-md px-6 py-3 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2 ${
            item.variant === "primary"
              ? "bg-orange-accent text-white hover:bg-orange-accent/90"
              : "border border-gray-300 bg-white hover:bg-gray-50 hover:text-orange-accent"
          }`,
          children: item.label,
        })}
      />
    }
    heading="Category Not Found"
    listItems={CATEGORY_LIST_ITEMS}
    subheading="The category you're looking for doesn't exist or may have been removed."
  />
);

export default CategoryNotFound;
