import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { parse, safeParse } from "valibot";
import { DEFAULT_LIMIT } from "../../../src/lib/pagination/constants";
import { limitItemSchema } from "../../../src/lib/pagination/schema";

describe("limitItemSchema", () => {
  it("passes on 10", () => {
    const parsed = safeParse(limitItemSchema, 10);

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.output).toBe(10);
    }
  });

  it("falls back to DEFAULT_LIMIT on 7", () => {
    expect(parse(limitItemSchema, 7)).toBe(DEFAULT_LIMIT);
  });
});
