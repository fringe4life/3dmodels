import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { toPagination } from "../../../src/lib/pagination/utils/to-pagination";

const a = { id: "a" };
const b = { id: "b" };
const c = { id: "c" };
const cursor = "01900000-0000-7000-8000-000000000001";

describe("toPagination", () => {
  it("returns null when items is null", () => {
    expect(toPagination({ cursor: "", items: null, limit: 2 })).toBeNull();
  });

  it("returns null when items is undefined", () => {
    expect(toPagination({ cursor: "", items: undefined, limit: 2 })).toBeNull();
  });

  it("keeps empty items and both flags false with no cursor", () => {
    expect(toPagination({ cursor: "", items: [], limit: 2 })).toEqual({
      items: [],
      metadata: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });
  });

  it("keeps empty items and previous enabled when forward with cursor", () => {
    expect(toPagination({ cursor, items: [], limit: 2 })).toEqual({
      items: [],
      metadata: {
        hasNextPage: false,
        hasPreviousPage: true,
      },
    });
  });

  it("keeps empty items and next enabled when backward with cursor", () => {
    expect(
      toPagination({
        cursor,
        direction: "backward",
        items: [],
        limit: 2,
      }),
    ).toEqual({
      items: [],
      metadata: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
    });
  });

  it("slices to limit and sets hasNext when more than limit, forward, no cursor", () => {
    expect(
      toPagination({
        cursor: "",
        direction: "forward",
        items: [a, b, c],
        limit: 2,
      }),
    ).toEqual({
      items: [a, b],
      metadata: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
    });
  });

  it("sets both flags when more than limit, forward, with cursor", () => {
    expect(
      toPagination({
        cursor,
        direction: "forward",
        items: [a, b, c],
        limit: 2,
      }),
    ).toEqual({
      items: [a, b],
      metadata: {
        hasNextPage: true,
        hasPreviousPage: true,
      },
    });
  });

  it("reverses sliced items and sets both flags when more than limit, backward, with cursor", () => {
    expect(
      toPagination({
        cursor,
        direction: "backward",
        items: [a, b, c],
        limit: 2,
      }),
    ).toEqual({
      items: [b, a],
      metadata: {
        hasNextPage: true,
        hasPreviousPage: true,
      },
    });
  });
});
