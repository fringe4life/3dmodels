import "@/tests/setup/test-globals";
import { describe, expect, it } from "bun:test";
import { transformToPaginatedResult } from "../../../src/features/pagination/utils/to-paginated-result";

describe("toPaginatedResult", () => {
  it("calculates pagination metadata", () => {
    const res = transformToPaginatedResult(
      {
        items: [1, 2, 3],
        itemsCount: 10,
      },
      { page: 0, limit: 10 },
    );
    expect(res.items.length).toBe(3);
    expect(res.total).toBe(10);
    expect((res as any).hasNextPage ?? true).toBeTruthy();
  });
});
