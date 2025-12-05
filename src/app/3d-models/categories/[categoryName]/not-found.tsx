import NotFound from "@/components/not-found/not-found";
import {
  CATEGORY_LINKS,
  CATEGORY_LIST_ITEMS,
} from "@/features/categories/constants";

const CategoryNotFound = () => (
  <NotFound
    heading="Category Not Found"
    links={CATEGORY_LINKS}
    listItems={CATEGORY_LIST_ITEMS}
    subheading="The category you're looking for doesn't exist or may have been removed."
  />
);

export default CategoryNotFound;
