import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { canonicalPathForListing } from "../../../src/features/models/listing/listing-canonical";

const SAMPLE_CURSOR = "01900000-0000-7000-8000-000000000001";

describe("canonicalPathForListing", () => {
  it("omits default cursor, direction, limit, sort, and empty query", async () => {
    await expect(
      canonicalPathForListing(
        "/3d-models",
        Promise.resolve({
          cursor: "",
          direction: "forward",
          limit: "10",
          query: "",
          sort: "alphabetic",
        }),
      ),
    ).resolves.toBe("/3d-models");
  });

  it("keeps non-default keys and sorts them", async () => {
    await expect(
      canonicalPathForListing(
        "/3d-models",
        Promise.resolve({
          cursor: SAMPLE_CURSOR,
          direction: "backward",
          query: "dragon",
          sort: "popular",
        }),
      ),
    ).resolves.toBe(
      `/3d-models?cursor=${SAMPLE_CURSOR}&direction=backward&query=dragon&sort=popular`,
    );
  });

  it("serializes category listings the same way", async () => {
    await expect(
      canonicalPathForListing(
        "/3d-models/categories/art",
        Promise.resolve({ limit: "20", query: "dragon" }),
      ),
    ).resolves.toBe("/3d-models/categories/art?limit=20&query=dragon");
  });

  it("ignores leftover page keys", async () => {
    await expect(
      canonicalPathForListing(
        "/3d-models",
        Promise.resolve({ page: "2", query: "dragon" }),
      ),
    ).resolves.toBe("/3d-models?query=dragon");
  });

  it("omits malformed cursors from the canonical URL", async () => {
    await expect(
      canonicalPathForListing(
        "/3d-models",
        Promise.resolve({
          cursor: "not-a-uuid",
          direction: "backward",
        }),
      ),
    ).resolves.toBe("/3d-models");
  });
});
