import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { tryCatch } from "../../../src/utils/try-catch";

describe("tryCatch", () => {
  it("returns data and null error on resolve", async () => {
    const result = await tryCatch(() => Promise.resolve(42));

    expect(result).toEqual({ data: 42, error: null });
  });

  it("returns thrown value as unknown error", async () => {
    const boom = new Error("boom");
    const result = await tryCatch(() => Promise.reject(boom));

    expect(result.data).toBeNull();
    expect(result.error).toBe(boom);

    const error: unknown = result.error;
    expect(error).toBe(boom);
    if (error instanceof Error) {
      expect(error.message).toBe("boom");
    }
  });

  it("preserves non-Error rejects as unknown", async () => {
    const result = await tryCatch(() => Promise.reject("nope"));

    expect(result).toEqual({ data: null, error: "nope" });
  });
});
