import Link from "next/link";
import { GenericComponent } from "@/components/generic-component";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { MODEL_LINKS, MODEL_LIST_ITEMS } from "@/features/models/constants";

const ModelNotFound = () => (
  <UnsuccessfulState
    action={
      <GenericComponent
        as="div"
        Component={Link}
        className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        items={MODEL_LINKS}
        renderKey={(_, index) => index}
        renderProps={(item) => ({
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
    heading="404 - Model Not Found"
    listItems={MODEL_LIST_ITEMS}
    subheading="The 3D model you're looking for doesn't exist or may have been removed from our collection."
  />
);

export default ModelNotFound;
