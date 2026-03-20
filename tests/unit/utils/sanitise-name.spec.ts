import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { sanitiseName } from "../../../src/utils/sanitise-name";

describe("sanitiseName", () => {
  it("replaces non-alphanumeric sequences with single dashes per char", () => {
    expect(sanitiseName("  Hello World  ")).toBe("--Hello-World--");
  });
  it("replaces symbols between alphanumerics with dashes", () => {
    expect(sanitiseName("a@b#c")).toBe("a-b-c");
  });
  it("handles empty string", () => {
    expect(sanitiseName("")).toBe("");
  });
});
