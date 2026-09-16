import "../../setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { PaginationLimitControl } from "../../../src/components/pagination/pagination-limit-control";
import {
  getLastUrlUpdate,
  withListingNuqsTestingAdapter,
} from "../../setup/nuqs-testing";

afterEach(() => {
  cleanup();
});

const getLimitSelect = () =>
  screen.getByRole("combobox", { name: "Pagination limit control" });

describe("PaginationLimitControl", () => {
  it("writes a valid limit to the URL", async () => {
    const onUrlUpdate = vi.fn();

    render(<PaginationLimitControl />, {
      wrapper: withListingNuqsTestingAdapter({
        hasMemory: true,
        onUrlUpdate,
      }),
    });

    fireEvent.change(getLimitSelect(), { target: { value: "20" } });

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    expect(getLastUrlUpdate(onUrlUpdate).searchParams.get("limit")).toBe("20");
  });

  it("falls back to DEFAULT_LIMIT for an invalid value", async () => {
    const onUrlUpdate = vi.fn();

    render(<PaginationLimitControl />, {
      wrapper: withListingNuqsTestingAdapter({
        hasMemory: true,
        onUrlUpdate,
        searchParams: { limit: "5" },
      }),
    });

    fireEvent.change(getLimitSelect(), { target: { value: "7" } });

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    expect(getLastUrlUpdate(onUrlUpdate).searchParams.get("limit")).toBeNull();
  });
});
