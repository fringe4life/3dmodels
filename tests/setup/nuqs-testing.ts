import {
  type UrlUpdateEvent,
  withNuqsTestingAdapter,
} from "nuqs/adapters/testing";
import { defaultOptions } from "../../src/lib/url";

type NuqsTestingAdapterProps = NonNullable<
  Parameters<typeof withNuqsTestingAdapter>[0]
>;

/** Listing routes pass `defaultOptions` (`shallow: false`; `clearOnDefault` is nuqs v2 default). */
const withListingNuqsTestingAdapter = (props: NuqsTestingAdapterProps = {}) =>
  withNuqsTestingAdapter({
    defaultOptions,
    ...props,
  });

const isUrlUpdateEvent = (value: unknown): value is UrlUpdateEvent => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "queryString" in value && "searchParams" in value && "options" in value
  );
};

const getLastUrlUpdate = (onUrlUpdate: {
  mock: { calls: readonly (readonly unknown[])[] };
}): UrlUpdateEvent => {
  const event = onUrlUpdate.mock.calls.at(-1)?.[0];
  if (!isUrlUpdateEvent(event)) {
    throw new Error("expected UrlUpdateEvent from onUrlUpdate");
  }
  return event;
};

export { getLastUrlUpdate, withListingNuqsTestingAdapter };
