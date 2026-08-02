import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import {
  modelDetailHref,
  resolveBackHref,
} from "../../../src/features/models/back-link/from-search-params";
import {
  DEFAULT_LISTING_HREF,
  toListingRoute,
} from "../../../src/features/pagination/listing-path";

describe("toListingRoute", () => {
  describe("allows trusted listing paths", () => {
    it.each([
      ["/3d-models", "/3d-models"],
      ["/3d-models?page=2&sort=popular", "/3d-models?page=2&sort=popular"],
      ["/3d-models?query=dragon", "/3d-models?query=dragon"],
      ["/3d-models/categories/art", "/3d-models/categories/art"],
      [
        "/3d-models/categories/art?page=1&query=dragon",
        "/3d-models/categories/art?page=1&query=dragon",
      ],
      ["/3d-models/categories/3d-printer", "/3d-models/categories/3d-printer"],
    ] as const)("%s → %s", (input, expected) => {
      expect(toListingRoute(input)).toBe(expected);
    });

    it("normalizes absolute URL that only matches the parse base to a relative path", () => {
      expect(toListingRoute("http://local.invalid/3d-models")).toBe(
        "/3d-models",
      );
      expect(
        toListingRoute("http://local.invalid/3d-models/categories/art?page=2"),
      ).toBe("/3d-models/categories/art?page=2");
    });
  });

  describe("rejects open-redirect / untrusted payloads (OWASP / payload-box style)", () => {
    it.each([
      // Protocol-relative
      "//evil.com",
      "//evil.com/",
      "//evil.com/phishing",
      "///evil.com",
      "////evil.com",
      "//evil.com?/3d-models",
      "\t//evil.com",
      // Absolute external
      "https://evil.com",
      "http://evil.com",
      "https://evil.com/3d-models",
      "http://evil.com/3d-models",
      // Scheme tricks
      "javascript:alert(1)",
      "data:text/html,hi",
      "vbscript:msgbox(1)",
      // Backslash / mixed-slash (browsers may treat as protocol-relative)
      "/\\evil.com",
      "/\\\\evil.com",
      "\\\\evil.com",
      "\\/\\/evil.com",
      "/\\/evil.com",
      // Userinfo / host confusion
      "https://evil.com@local.invalid",
      "https://evil.com@local.invalid/3d-models",
      "http://local.invalid.evil.com/3d-models",
      "https://local.invalid.evil.com/3d-models",
      // Path traversal after listing prefix
      "/3d-models/../../../evil.com",
      "/3d-models/../evil.com",
      "/3d-models/categories/%2e%2e/%2e%2e/evil.com",
      // Encoded protocol-relative / junk paths
      "/%2f%2fevil.com",
      "/3d-models%2Fcategories%2Fart",
      // Relative-looking external hosts
      "evil.com",
      "./evil.com",
      "../evil.com",
      // Non-listing same-origin paths
      "/about",
      "/signin",
      "/3d-models/foo",
      "/3d-models/categories/not-a-real-category",
      "/3d-models/categories/art/extra",
      "/3d-models/categories/art@evil.com",
      // Empty / whitespace
      "",
      " ",
      // Header-injection style
      "/3d-models\nSet-Cookie: evil=true",
      "/3d-models\r\nLocation: https://evil.com",
    ])("falls back for %j", (payload) => {
      expect(toListingRoute(payload)).toBe(DEFAULT_LISTING_HREF);
    });
  });

  it("keeps listing path when query contains an external URL as a value (not the target)", () => {
    // Query values are not navigation targets; path stays on listing.
    expect(toListingRoute("/3d-models?from=https://evil.com")).toBe(
      "/3d-models?from=https://evil.com",
    );
  });
});

describe("resolveBackHref", () => {
  it("sanitizes raw from via toListingRoute", async () => {
    await expect(
      resolveBackHref(Promise.resolve({ from: "//evil.com" })),
    ).resolves.toBe(DEFAULT_LISTING_HREF);

    await expect(
      resolveBackHref(
        Promise.resolve({ from: "/3d-models/categories/art?page=2" }),
      ),
    ).resolves.toBe("/3d-models/categories/art?page=2");
  });

  it("defaults when from is missing", async () => {
    await expect(resolveBackHref(Promise.resolve({}))).resolves.toBe(
      DEFAULT_LISTING_HREF,
    );
  });
});

describe("modelDetailHref", () => {
  it("embeds a trusted returnTo and stays on the model detail path", () => {
    const href = modelDetailHref("cool-model", "/3d-models/categories/art");
    expect(href.startsWith("/3d-models/cool-model")).toBe(true);
    expect(href).toContain("from=");
    expect(href.startsWith("http:") || href.startsWith("https:")).toBe(false);
    expect(href.startsWith("//")).toBe(false);
  });

  it("rejects unsafe / non-slugify-stable slug segments", () => {
    expect(modelDetailHref("../evil", "/3d-models")).toBe(DEFAULT_LISTING_HREF);
    expect(modelDetailHref("a/b", "/3d-models")).toBe(DEFAULT_LISTING_HREF);
    expect(modelDetailHref("a?b", "/3d-models")).toBe(DEFAULT_LISTING_HREF);
    expect(modelDetailHref("a#b", "/3d-models")).toBe(DEFAULT_LISTING_HREF);
    expect(modelDetailHref("foo%2Fbar", "/3d-models")).toBe(
      DEFAULT_LISTING_HREF,
    );
    expect(modelDetailHref("a%3Fb", "/3d-models")).toBe(DEFAULT_LISTING_HREF);
    expect(modelDetailHref("caf%C3%A9", "/3d-models")).toBe(
      DEFAULT_LISTING_HREF,
    );
    expect(modelDetailHref("Cool-Model", "/3d-models")).toBe(
      DEFAULT_LISTING_HREF,
    );
    expect(modelDetailHref("a--b", "/3d-models")).toBe(DEFAULT_LISTING_HREF);
    expect(modelDetailHref("", "/3d-models")).toBe(DEFAULT_LISTING_HREF);
  });
});
