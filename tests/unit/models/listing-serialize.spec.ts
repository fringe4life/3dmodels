import { describe, expect, it } from "bun:test";
import { listingPaginationHrefs } from "../../../src/features/models/listing/listing-pagination-hrefs";
import { listingHref } from "../../../src/features/models/listing/listing-serialize";
import { DEFAULT_SORT } from "../../../src/features/models/sort/constants";
import {
  DEFAULT_CURSOR,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
} from "../../../src/lib/pagination/constants";

const baseValues = {
  cursor: DEFAULT_CURSOR,
  direction: DEFAULT_DIRECTION,
  limit: DEFAULT_LIMIT,
  query: "",
  sort: DEFAULT_SORT,
};

describe("listingHref", () => {
  it("omits default pager keys when resetting", () => {
    const href = listingHref(
      "/3d-models?cursor=01900000-0000-7000-8000-000000000001&direction=backward&query=dragon",
      {
        cursor: DEFAULT_CURSOR,
        direction: DEFAULT_DIRECTION,
        query: "dragon",
      },
    );

    expect(href).toBe("/3d-models?query=dragon");
  });

  it("sets sort and clears pager defaults", () => {
    expect(
      listingHref(
        "/3d-models?query=dragon&cursor=01900000-0000-7000-8000-000000000001",
        {
          cursor: DEFAULT_CURSOR,
          direction: DEFAULT_DIRECTION,
          sort: "popular",
        },
      ),
    ).toBe("/3d-models?query=dragon&sort=popular");
  });
});

describe("listingPaginationHrefs", () => {
  const firstId = "01900000-0000-7000-8000-000000000001";
  const lastId = "01900000-0000-7000-8000-000000000002";

  it("builds next and previous hrefs from item ids", () => {
    const hrefs = listingPaginationHrefs({
      base: "/3d-models",
      hasNextPage: true,
      hasPreviousPage: true,
      items: [{ id: firstId }, { id: lastId }],
      values: baseValues,
    });

    expect(hrefs.nextHref).toBe(`/3d-models?cursor=${lastId}`);
    expect(hrefs.previousHref).toBe(
      `/3d-models?cursor=${firstId}&direction=backward`,
    );
    expect(hrefs.limitOptions.find((o) => o.value === 20)?.href).toBe(
      "/3d-models?limit=20",
    );
  });
});
