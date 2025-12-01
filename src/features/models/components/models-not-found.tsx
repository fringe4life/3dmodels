import { cacheLife } from "next/cache";
import NotFound from "@/components/not-found";

// biome-ignore lint/suspicious/useAwait: needed for use cache
const ModelsNotFound = async () => {
  "use cache: remote";
  cacheLife("max");
  return (
    <NotFound
      heading="No models found"
      links={[
        {
          label: "Browse all models",
          href: "/3d-models",
        },
      ]}
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

export default ModelsNotFound;
