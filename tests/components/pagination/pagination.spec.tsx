import "../../setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../../../src/components/pagination/pagination";
import {
  getLastUrlUpdate,
  withListingNuqsTestingAdapter,
} from "../../setup/nuqs-testing";

afterEach(() => {
  cleanup();
});

describe("Pagination", () => {
  it("increments page in the URL", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(
      <Pagination metadata={{ count: 40, hasNextPage: true, page: 0 }} />,
      {
        wrapper: withListingNuqsTestingAdapter({
          hasMemory: true,
          onUrlUpdate,
        }),
      },
    );

    await user.click(screen.getByRole("button", { name: "Next page" }));

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    const event = getLastUrlUpdate(onUrlUpdate);
    expect(event.searchParams.get("page")).toBe("1");
    expect(event.options.history).toBe("replace");
  });

  it("decrements page and omits the default", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(
      <Pagination metadata={{ count: 40, hasNextPage: true, page: 1 }} />,
      {
        wrapper: withListingNuqsTestingAdapter({
          hasMemory: true,
          onUrlUpdate,
          searchParams: { page: "1" },
        }),
      },
    );

    await user.click(screen.getByRole("button", { name: "Previous page" }));

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    const event = getLastUrlUpdate(onUrlUpdate);
    expect(event.searchParams.get("page")).toBeNull();
  });

  it("writes limit and resets page to the default", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(
      <Pagination metadata={{ count: 40, hasNextPage: true, page: 2 }} />,
      {
        wrapper: withListingNuqsTestingAdapter({
          hasMemory: true,
          onUrlUpdate,
          searchParams: { page: "2" },
        }),
      },
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Pagination limit control" }),
      "20",
    );

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    const event = getLastUrlUpdate(onUrlUpdate);
    expect(event.searchParams.get("limit")).toBe("20");
    expect(event.searchParams.get("page")).toBeNull();
  });
});
