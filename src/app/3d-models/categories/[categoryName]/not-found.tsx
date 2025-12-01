import NotFound from "@/components/not-found";
import {
  CATEGORY_LINKS,
  CATEGORY_LIST_ITEMS,
} from "@/features/categories/constants";

export default function CategoryNotFound() {
  return (
    <NotFound
      heading="Category Not Found"
      links={CATEGORY_LINKS}
      listItems={CATEGORY_LIST_ITEMS}
      subheading="The category you're looking for doesn't exist or may have been removed."
    />
  );
}
