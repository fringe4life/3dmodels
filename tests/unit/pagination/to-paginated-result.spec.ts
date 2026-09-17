import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { transformToPaginatedResult } from "../../../src/lib/pagination/utils/to-paginated-result";

const cursor = "01900000-0000-7000-8000-000000000001";

describe("transformToPaginatedResult", () => {
  it("returns error when items is null", () => {
    const res = transformToPaginatedResult(
      { items: null },
      { cursor: "", direction: "forward", limit: 10 },
    );
    expect(res.type).toBe("error");
  });

  it("returns empty when there is no cursor and no items", () => {
    const res = transformToPaginatedResult(
      { items: [] },
      { cursor: "", direction: "forward", limit: 10 },
    );
    expect(res.type).toBe("empty");
  });

  it("returns success for an empty slice with a cursor", () => {
    const res = transformToPaginatedResult(
      { items: [] },
      { cursor, direction: "forward", limit: 10 },
    );
    expect(res.type).toBe("success");
    if (res.type !== "success") {
      throw new Error("expected success");
    }
    expect(res.items).toEqual([]);
    expect(res.metadata).toEqual({
      hasNextPage: false,
      hasPreviousPage: true,
    });
  });

  it("slices extra row and sets next flag", () => {
    const res = transformToPaginatedResult(
      { items: [{ id: "a" }, { id: "b" }, { id: "c" }] },
      { cursor: "", direction: "forward", limit: 2 },
    );
    expect(res.type).toBe("success");
    if (res.type !== "success") {
      throw new Error("expected success");
    }
    expect(res.items).toEqual([{ id: "a" }, { id: "b" }]);
    expect(res.metadata.hasNextPage).toBe(true);
    expect(res.metadata.hasPreviousPage).toBe(false);
  });
});
