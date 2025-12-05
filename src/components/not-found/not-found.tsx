import Link from "next/link";
import GenericComponent from "@/components/generic-component";
import NotFoundListItem, {
  type NotFoundListItemProps,
} from "@/components/not-found/not-found-list-item";

export type NotFoundLink = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type NotFoundProps = {
  heading: string;
  subheading: string;
  links: NotFoundLink[];
  listItems: NotFoundListItemProps[];
};

const NotFound = ({ heading, subheading, links, listItems }: NotFoundProps) => (
  <div className="grid min-h-[60vh] place-items-center px-4" data-not-found>
    <div className="max-w-2xl space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">
          {heading}
        </h1>
        <p className="text-gray-600 text-lg">{subheading}</p>
      </div>

      <div className="corner-squircle space-y-4 rounded-lg border border-gray-200 bg-white p-6 text-left">
        <h2 className="font-semibold text-xl">What you can do:</h2>
        <GenericComponent
          as="ul"
          Component={NotFoundListItem}
          className="space-y-2 text-gray-600"
          items={listItems}
          renderKey={(_item, index) => index}
          renderProps={(item) => ({ text: item.text })}
        />
      </div>

      <GenericComponent
        as="div"
        Component={Link}
        className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        items={links}
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
    </div>
  </div>
);

export default NotFound;
