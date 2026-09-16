import "../../setup/test-globals";
import { describe, expect, it } from "bun:test";
import { lastNonSecretFormValue } from "../../../src/lib/safe-action-form";

describe("lastNonSecretFormValue", () => {
  it("returns a string field from FormData", () => {
    const input = new FormData();
    input.set("email", "ada@example.com");

    expect(
      lastNonSecretFormValue(input, { name: "email", type: "email" }),
    ).toBe("ada@example.com");
  });

  it("omits password fields even when FormData has them", () => {
    const input = new FormData();
    input.set("password", "secret");
    input.set("currentPassword", "secret");

    expect(
      lastNonSecretFormValue(input, { name: "password", type: "password" }),
    ).toBeUndefined();
    expect(
      lastNonSecretFormValue(input, {
        name: "currentPassword",
        type: "password",
      }),
    ).toBeUndefined();
  });

  it("returns undefined when input is not FormData", () => {
    expect(
      lastNonSecretFormValue(
        { email: "ada@example.com" },
        { name: "email", type: "email" },
      ),
    ).toBeUndefined();
  });

  it("returns undefined for non-string FormData values", () => {
    const input = new FormData();
    input.set("avatar", new File(["x"], "x.png", { type: "image/png" }));

    expect(
      lastNonSecretFormValue(input, { name: "avatar", type: "file" }),
    ).toBeUndefined();
  });
});
