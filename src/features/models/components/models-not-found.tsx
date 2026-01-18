import Link from "next/link";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";

const ModelsNotFound = () => {
  return (
    <UnsuccessfulState
      action={
        <Link
          className="inline-flex items-center justify-center rounded-md bg-orange-accent px-2 py-3 font-medium text-sm text-white transition-colors hover:bg-orange-accent/90 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2 sm:px-6"
          href="/3d-models"
        >
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
};

export { ModelsNotFound };
