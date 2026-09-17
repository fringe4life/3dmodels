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
  cursorPaginationParsers,
  limitParser,
  queryParser,
} from "../../../src/lib/pagination/search-params";

const SAMPLE_CURSOR = "01900000-0000-7000-8000-000000000001";

describe("listing search param parsers", () => {
  it("keeps query parse/serialize bijective", () => {
    expect(isParserBijective(queryParser.query, "dragon", "dragon")).toBe(true);
    expect(testParseThenSerialize(queryParser.query, "dragon")).toBe(true);
    expect(testSerializeThenParse(queryParser.query, "dragon")).toBe(true);
  });

  it("keeps cursor parse/serialize bijective", () => {
    expect(
      isParserBijective(
        cursorPaginationParsers.cursor,
        SAMPLE_CURSOR,
        SAMPLE_CURSOR,
      ),
    ).toBe(true);
    expect(testParseThenSerialize(cursorPaginationParsers.cursor, "")).toBe(
      true,
    );
  });

  it("keeps direction parse/serialize bijective", () => {
    expect(
      isParserBijective(
        cursorPaginationParsers.direction,
        "backward",
        "backward",
      ),
    ).toBe(true);
    expect(
      testParseThenSerialize(cursorPaginationParsers.direction, "forward"),
    ).toBe(true);
  });

  it("keeps allowed limit parse/serialize bijective", () => {
    expect(isParserBijective(limitParser.limit, "20", 20)).toBe(true);
    expect(testParseThenSerialize(limitParser.limit, "5")).toBe(true);
    expect(testSerializeThenParse(limitParser.limit, 50)).toBe(true);
  });

  it("keeps sort parse/serialize bijective", () => {
    expect(isParserBijective(sortParser.sort, "popular", "popular")).toBe(true);
    expect(testParseThenSerialize(sortParser.sort, "recent")).toBe(true);
    expect(testSerializeThenParse(sortParser.sort, "alphabetic")).toBe(true);
  });

  it("rejects values that cannot round-trip", () => {
    expect(() => testParseThenSerialize(limitParser.limit, "7")).toThrow();
    expect(() => testParseThenSerialize(sortParser.sort, "nope")).toThrow();
    expect(() =>
      testParseThenSerialize(cursorPaginationParsers.direction, "sideways"),
    ).toThrow();
    expect(() =>
      testParseThenSerialize(cursorPaginationParsers.cursor, "not-a-uuid"),
    ).toThrow();
    expect(() =>
      testParseThenSerialize(
        cursorPaginationParsers.cursor,
        "01900000-0000-4000-8000-000000000001",
      ),
    ).toThrow();
  });
});

describe("searchParamsCache.parse", () => {
  it("fills listing defaults when keys are missing", () => {
    expect(searchParamsCache.parse({})).toEqual({
      cursor: "",
      direction: "forward",
      limit: 10,
      query: "",
      sort: "alphabetic",
    });
  });

  it("parses non-default listing keys", () => {
    expect(
      searchParamsCache.parse({
        cursor: SAMPLE_CURSOR,
        direction: "backward",
        limit: "20",
        query: "dragon",
        sort: "popular",
      }),
    ).toEqual({
      cursor: SAMPLE_CURSOR,
      direction: "backward",
      limit: 20,
      query: "dragon",
      sort: "popular",
    });
  });

  it("falls back to defaults for invalid literals", () => {
    expect(
      searchParamsCache.parse({
        cursor: "not-a-uuid",
        direction: "sideways",
        limit: "7",
        sort: "nope",
      }),
    ).toEqual({
      cursor: "",
      direction: "forward",
      limit: 10,
      query: "",
      sort: "alphabetic",
    });
  });
});
