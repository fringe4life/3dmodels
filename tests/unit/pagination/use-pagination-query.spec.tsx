import "../../setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, renderHook } from "@testing-library/react";
import { usePaginationQuery } from "../../../src/components/pagination/use-pagination-query";
import { withListingNuqsTestingAdapter } from "../../setup/nuqs-testing";

afterEach(() => {
  cleanup();
});

describe("usePaginationQuery", () => {
  it("uses default page and limit when the URL is empty", () => {
    const { result } = renderHook(() => usePaginationQuery(), {
      wrapper: withListingNuqsTestingAdapter(),
    });

    expect(result.current.pagination).toEqual({ limit: 10, page: 0 });
  });

  it("reads page and limit from initial search params", () => {
    const { result } = renderHook(() => usePaginationQuery(), {
      wrapper: withListingNuqsTestingAdapter({
        searchParams: { limit: "20", page: "3" },
      }),
    });

    expect(result.current.pagination).toEqual({ limit: 20, page: 3 });
  });

  it("falls back to defaults for invalid limit or page", () => {
    const { result } = renderHook(() => usePaginationQuery(), {
      wrapper: withListingNuqsTestingAdapter({
        searchParams: { limit: "7", page: "nope" },
      }),
    });

    expect(result.current.pagination).toEqual({ limit: 10, page: 0 });
  });
});
