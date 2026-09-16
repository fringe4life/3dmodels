import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { models } from "../../../src/db/schema/models";
import { createKeysetCursorPredicate } from "../../../src/lib/pagination/utils/create-keyset-cursor";

describe("createKeysetCursorPredicate", () => {
  it("builds an exclusive (sortCol, id) SQL predicate", () => {
    const predicate = createKeysetCursorPredicate({
      cursorId: "01900000-0000-7000-8000-000000000001",
      idColumn: models.id,
      idDirection: "asc",
      sortColumn: models.name,
      sortDirection: "asc",
      sortValue: "Alpha",
    });

    expect(predicate).toBeDefined();
  });
});
