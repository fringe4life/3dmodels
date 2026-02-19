import "@/tests/setup/test-globals";
import { describe, expect, it } from "bun:test";
import { sanitiseName } from "../../../src/utils/sanitise-name";

describe("sanitiseName", () => {
  it("normalizes whitespace and case", () => {
    expect(sanitiseName("  Hello World  ")).toBe("hello-world");
  });
  it("removes non-alphanumeric except dashes", () => {
    expect(sanitiseName("a@b#c")).toBe("abc");
  });
  it("handles empty string", () => {
    expect(sanitiseName("")).toBe("");
  });
});
