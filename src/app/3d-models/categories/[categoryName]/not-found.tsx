import Link from "next/link";
import { buttonRecipe } from "@/components/button";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { CATEGORY_LIST_ITEMS } from "@/features/categories/constants";

const CategoryNotFound = () => (
  <UnsuccessfulState
    action={
      <Link className={buttonRecipe({ variant: "primary" })} href="/3d-models">
        Browse All categories
      </Link>
    }
    heading="Category Not Found"
    listItems={CATEGORY_LIST_ITEMS}
    subheading="The category you're looking for doesn't exist or may have been removed."
  />
);

export default CategoryNotFound;
