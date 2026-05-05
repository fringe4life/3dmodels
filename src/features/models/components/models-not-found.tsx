import Link from "next/link";
import { buttonRecipe } from "@/components/button";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";

const ModelsNotFound = () => (
  <UnsuccessfulState
    action={
      <Link className={buttonRecipe({ variant: "primary" })} href="/3d-models">
        Browse All Models
      </Link>
    }
    heading="No models found"
    listItems={[
      {
        text: "Check your spelling and try different keywords",
      },
      {
        text: "Use fewer or more general search terms",
      },
      {
        text: "Browse models by category to discover similar items",
      },
      {
        text: "Try searching for related terms or synonyms",
      },
    ]}
    subheading="Your search returned no results."
  />
);

export { ModelsNotFound };
