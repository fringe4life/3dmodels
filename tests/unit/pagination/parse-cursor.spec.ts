import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { parsePaginationCursor } from "../../../src/lib/pagination/parse-cursor";

const SAMPLE_CURSOR = "01900000-0000-7000-8000-000000000001";

describe("parsePaginationCursor", () => {
  it("returns undefined for empty cursor", () => {
    expect(parsePaginationCursor("")).toBeUndefined();
  });

  it("returns undefined for malformed cursor", () => {
    expect(parsePaginationCursor("not-a-uuid")).toBeUndefined();
    expect(
      parsePaginationCursor("01900000-0000-4000-8000-000000000001"),
    ).toBeUndefined();
  });

  it("brands a uuidv7 cursor", () => {
    expect(parsePaginationCursor(SAMPLE_CURSOR)).toBe(SAMPLE_CURSOR);
  });
});
