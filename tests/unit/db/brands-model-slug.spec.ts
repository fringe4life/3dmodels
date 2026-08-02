import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import slugify from "slugify";
import { isModelSlug } from "../../../src/db/brands";
import { MODEL_SLUGIFY_OPTIONS } from "../../../src/lib/slugify";

describe("isModelSlug", () => {
  it("accepts slugify-stable outputs used by seed data", () => {
    expect(isModelSlug("articulated-dragon")).toBe(true);
    expect(isModelSlug("3d-printer")).toBe(true);
    expect(
      isModelSlug(slugify("Articulated Dragon", MODEL_SLUGIFY_OPTIONS)),
    ).toBe(true);
  });

  it("rejects empty, encoded, unicode, and unstable segments", () => {
    expect(isModelSlug("")).toBe(false);
    expect(isModelSlug("foo%2Fbar")).toBe(false);
    expect(isModelSlug("a/b")).toBe(false);
    expect(isModelSlug("../evil")).toBe(false);
    expect(isModelSlug("Cool-Model")).toBe(false);
    expect(isModelSlug("a--b")).toBe(false);
    expect(isModelSlug("café")).toBe(false);
  });
});
