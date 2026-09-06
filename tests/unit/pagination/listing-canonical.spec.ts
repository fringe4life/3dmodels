import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { canonicalPathForListing } from "../../../src/features/models/listing/listing-canonical";

describe("canonicalPathForListing", () => {
  it("omits default page, limit, sort, and empty query", async () => {
    await expect(
      canonicalPathForListing(
        "/3d-models",
        Promise.resolve({
          limit: "10",
          page: "0",
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
          page: "2",
          query: "dragon",
          sort: "popular",
        }),
      ),
    ).resolves.toBe("/3d-models?page=2&query=dragon&sort=popular");
  });

  it("serializes category listings the same way", async () => {
    await expect(
      canonicalPathForListing(
        "/3d-models/categories/art",
        Promise.resolve({ limit: "20", query: "dragon" }),
      ),
    ).resolves.toBe("/3d-models/categories/art?limit=20&query=dragon");
  });
});
