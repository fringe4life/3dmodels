import "../../setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../../../src/components/pagination/pagination";
import {
  getLastUrlUpdate,
  withListingNuqsTestingAdapter,
} from "../../setup/nuqs-testing";

const firstId = "01900000-0000-7000-8000-000000000001";
const lastId = "01900000-0000-7000-8000-000000000002";
const items = [{ id: firstId }, { id: lastId }];

afterEach(() => {
  cleanup();
});

describe("Pagination", () => {
  it("writes the last item id and forward direction", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(
      <Pagination
        items={items}
        metadata={{ hasNextPage: true, hasPreviousPage: false }}
      />,
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
    expect(event.searchParams.get("cursor")).toBe(lastId);
    expect(event.searchParams.get("direction")).toBeNull();
    expect(event.options.history).toBe("replace");
  });

  it("writes the first item id and backward direction", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(
      <Pagination
        items={items}
        metadata={{ hasNextPage: true, hasPreviousPage: true }}
      />,
      {
        wrapper: withListingNuqsTestingAdapter({
          hasMemory: true,
          onUrlUpdate,
          searchParams: { cursor: lastId },
        }),
      },
    );

    await user.click(screen.getByRole("button", { name: "Previous page" }));

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    const event = getLastUrlUpdate(onUrlUpdate);
    expect(event.searchParams.get("cursor")).toBe(firstId);
    expect(event.searchParams.get("direction")).toBe("backward");
  });

  it("writes limit without resetting cursor", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(
      <Pagination
        items={items}
        metadata={{ hasNextPage: true, hasPreviousPage: true }}
      />,
      {
        wrapper: withListingNuqsTestingAdapter({
          hasMemory: true,
          onUrlUpdate,
          searchParams: { cursor: lastId },
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
    expect(event.searchParams.get("cursor")).toBe(lastId);
  });
});
