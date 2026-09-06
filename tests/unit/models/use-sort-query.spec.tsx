import "../../setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, renderHook } from "@testing-library/react";
import { useSortQuery } from "../../../src/features/models/sort/hooks/use-sort-query";
import { withListingNuqsTestingAdapter } from "../../setup/nuqs-testing";

afterEach(() => {
  cleanup();
});

describe("useSortQuery", () => {
  it("defaults to alphabetic when sort is missing", () => {
    const { result } = renderHook(() => useSortQuery(), {
      wrapper: withListingNuqsTestingAdapter(),
    });

    expect(result.current.sort).toBe("alphabetic");
  });

  it("reads sort from initial search params", () => {
    const { result } = renderHook(() => useSortQuery(), {
      wrapper: withListingNuqsTestingAdapter({
        searchParams: { sort: "popular" },
      }),
    });

    expect(result.current.sort).toBe("popular");
  });

  it("falls back to alphabetic for an unknown sort value", () => {
    const { result } = renderHook(() => useSortQuery(), {
      wrapper: withListingNuqsTestingAdapter({
        searchParams: { sort: "nope" },
      }),
    });

    expect(result.current.sort).toBe("alphabetic");
  });
});
