import Link from "next/link";
import { GenericComponent } from "@/components/generic-component";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import type { UnsuccessfulStateLink } from "@/types";

const ModelsNotFound = () => {
  const links: UnsuccessfulStateLink[] = [
    {
      label: "Browse all models",
      href: "/3d-models",
    },
  ];
  return (
    <UnsuccessfulState
      action={
        <GenericComponent
          as="div"
          Component={Link}
          className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          items={links}
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
