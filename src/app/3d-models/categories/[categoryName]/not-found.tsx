import Link from "next/link";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { CATEGORY_LIST_ITEMS } from "@/features/categories/constants";

const CategoryNotFound = () => (
  <UnsuccessfulState
    action={
      <Link
        className="inline-flex items-center justify-center rounded-md bg-orange-accent px-6 py-3 font-medium text-sm text-white transition-colors hover:bg-orange-accent/90 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2"
        href="/3d-models"
      >
        Browse All categories
      </Link>
    }
    heading="Category Not Found"
    listItems={CATEGORY_LIST_ITEMS}
    subheading="The category you're looking for doesn't exist or may have been removed."
  />
);

export default CategoryNotFound;
