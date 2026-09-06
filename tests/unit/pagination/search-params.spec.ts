import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import {
  isParserBijective,
  testParseThenSerialize,
  testSerializeThenParse,
} from "nuqs/testing";
import { searchParamsCache } from "../../../src/features/models/listing-search-params";
import { sortParser } from "../../../src/features/models/sort/sort-search-params";
import {
  paginationParser,
  queryParser,
} from "../../../src/lib/pagination/search-params";

describe("listing search param parsers", () => {
  it("keeps query parse/serialize bijective", () => {
    expect(isParserBijective(queryParser.query, "dragon", "dragon")).toBe(true);
    expect(testParseThenSerialize(queryParser.query, "dragon")).toBe(true);
    expect(testSerializeThenParse(queryParser.query, "dragon")).toBe(true);
  });

  it("keeps page parse/serialize bijective", () => {
    expect(isParserBijective(paginationParser.page, "2", 2)).toBe(true);
    expect(testParseThenSerialize(paginationParser.page, "0")).toBe(true);
    expect(testSerializeThenParse(paginationParser.page, 0)).toBe(true);
  });

  it("keeps allowed limit parse/serialize bijective", () => {
    expect(isParserBijective(paginationParser.limit, "20", 20)).toBe(true);
    expect(testParseThenSerialize(paginationParser.limit, "5")).toBe(true);
    expect(testSerializeThenParse(paginationParser.limit, 50)).toBe(true);
  });

  it("keeps sort parse/serialize bijective", () => {
    expect(isParserBijective(sortParser.sort, "popular", "popular")).toBe(true);
    expect(testParseThenSerialize(sortParser.sort, "recent")).toBe(true);
    expect(testSerializeThenParse(sortParser.sort, "alphabetic")).toBe(true);
  });

  it("rejects values that cannot round-trip", () => {
    expect(() =>
      testParseThenSerialize(paginationParser.page, "not-a-number"),
    ).toThrow();
    expect(() => testParseThenSerialize(paginationParser.limit, "7")).toThrow();
    expect(() => testParseThenSerialize(sortParser.sort, "nope")).toThrow();
    expect(() => isParserBijective(paginationParser.page, "2", 3)).toThrow();
  });
});

describe("searchParamsCache.parse", () => {
  it("fills listing defaults when keys are missing", () => {
    expect(searchParamsCache.parse({})).toEqual({
      limit: 10,
      page: 0,
      query: "",
      sort: "alphabetic",
    });
  });

  it("parses non-default listing keys", () => {
    expect(
      searchParamsCache.parse({
        limit: "20",
        page: "2",
        query: "dragon",
        sort: "popular",
      }),
    ).toEqual({
      limit: 20,
      page: 2,
      query: "dragon",
      sort: "popular",
    });
  });

  it("falls back to defaults for invalid literals", () => {
    expect(
      searchParamsCache.parse({
        limit: "7",
        page: "nope",
        sort: "nope",
      }),
    ).toEqual({
      limit: 10,
      page: 0,
      query: "",
      sort: "alphabetic",
    });
  });
});
