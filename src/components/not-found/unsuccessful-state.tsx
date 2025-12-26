import GenericComponent from "@/components/generic-component";
import UnsuccessfulStateListItem from "@/components/not-found/unsuccessful-state-list-item";
import type { UnsuccessfulStateProps } from "@/types";

const UnsuccessfulState = ({
  heading,
  subheading,
  action,
  listItems,
  isError = false,
}: UnsuccessfulStateProps) => (
  <div
    className="mx-4 grid min-h-[60vh] place-items-center p-4"
    data-error={isError}
    data-not-found={!isError}
  >
    <div className="max-w-2xl space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="font-bold error:text-red-600 text-4xl tracking-tight sm:text-5xl">
          {heading}
        </h1>
        <p className="error:text-red-500 text-gray-600 text-lg">{subheading}</p>
      </div>

      <div className="corner-squircle space-y-4 rounded-lg border border-gray-200 error:border-red-500 bg-white p-6 text-left">
        <h2 className="font-semibold text-xl">What you can do:</h2>
        <GenericComponent
          as="ul"
          Component={UnsuccessfulStateListItem}
          className="space-y-2 text-gray-600"
          items={listItems}
          renderKey={(_item, index) => index}
          renderProps={(item) => ({ text: item.text })}
        />
      </div>

      {!!action && (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {action}
        </div>
      )}
    </div>
  </div>
);

export default UnsuccessfulState;
