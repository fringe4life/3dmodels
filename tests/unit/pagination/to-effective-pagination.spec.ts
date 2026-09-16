import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { toEffectivePagination } from "../../../src/lib/pagination/utils/to-effective-pagination";

const cursor = "01900000-0000-7000-8000-000000000001";

describe("toEffectivePagination", () => {
  it("forces first-page state when cursor is empty", () => {
    expect(
      toEffectivePagination({
        cursor: "",
        cursorRowExists: false,
        direction: "backward",
        limit: 10,
      }),
    ).toEqual({
      cursor: "",
      direction: "forward",
      limit: 10,
    });
  });

  it("forces first-page state when cursor row is missing", () => {
    expect(
      toEffectivePagination({
        cursor,
        cursorRowExists: false,
        direction: "backward",
        limit: 20,
      }),
    ).toEqual({
      cursor: "",
      direction: "forward",
      limit: 20,
    });
  });

  it("keeps cursor and direction when the cursor row exists", () => {
    expect(
      toEffectivePagination({
        cursor,
        cursorRowExists: true,
        direction: "backward",
        limit: 10,
      }),
    ).toEqual({
      cursor,
      direction: "backward",
      limit: 10,
    });
  });
});
