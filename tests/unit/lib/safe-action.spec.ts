import "../../setup/test-globals";
import { describe, expect, it, spyOn } from "bun:test";
import { APIError } from "better-auth/api";
import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { array, instance, object, string } from "valibot";
import { actionClient, formDataInput } from "../../../src/lib/safe-action";

describe("formDataInput", () => {
  it("keeps repeated FormData keys as arrays", async () => {
    const schema = object({ tags: array(string()) });
    const formData = new FormData();
    formData.append("tags", "a");
    formData.append("tags", "b");

    const result = await formDataInput(schema)["~standard"].validate(formData);

    expect("value" in result).toBe(true);
    if ("value" in result) {
      expect(result.value).toEqual({ tags: ["a", "b"] });
    }
  });

  it("keeps a single FormData value as a scalar for string fields", async () => {
    const schema = object({ email: string() });
    const formData = new FormData();
    formData.set("email", "ada@example.com");

    const result = await formDataInput(schema)["~standard"].validate(formData);

    expect("value" in result).toBe(true);
    if ("value" in result) {
      expect(result.value).toEqual({ email: "ada@example.com" });
    }
  });

  it("keeps File values as File instances", async () => {
    const schema = object({ avatar: instance(File) });
    const avatar = new File(["x"], "x.png", { type: "image/png" });
    const formData = new FormData();
    formData.set("avatar", avatar);

    const result = await formDataInput(schema)["~standard"].validate(formData);

    expect("value" in result).toBe(true);
    if ("value" in result) {
      expect(result.value.avatar).toBeInstanceOf(File);
      expect(result.value.avatar.name).toBe("x.png");
    }
  });
});

describe("handleServerError", () => {
  it("does not leak unexpected Error.message to the client", async () => {
    const errorSpy = spyOn(console, "error").mockImplementation(
      () => undefined,
    );
    try {
      const leakAction = actionClient.action(() =>
        Promise.reject(new Error("SQLITE_ERROR: no such table: secret_users")),
      );

      const result = await leakAction();

      expect(result.serverError).toBe(DEFAULT_SERVER_ERROR_MESSAGE);
      expect(errorSpy).toHaveBeenCalled();
    } finally {
      errorSpy.mockRestore();
    }
  });

  it("surfaces client-safe APIError messages", async () => {
    const leakAction = actionClient.action(() =>
      Promise.reject(
        new APIError("UNAUTHORIZED", {
          message: "Invalid email or password",
        }),
      ),
    );

    const result = await leakAction();

    expect(result.serverError).toBe("Invalid email or password");
  });

  it("does not leak 5xx APIError messages", async () => {
    const errorSpy = spyOn(console, "error").mockImplementation(
      () => undefined,
    );
    try {
      const leakAction = actionClient.action(() =>
        Promise.reject(
          new APIError("INTERNAL_SERVER_ERROR", {
            message: "DATABASE_URL is not set",
          }),
        ),
      );

      const result = await leakAction();

      expect(result.serverError).toBe(DEFAULT_SERVER_ERROR_MESSAGE);
      expect(errorSpy).toHaveBeenCalled();
    } finally {
      errorSpy.mockRestore();
    }
  });
});
