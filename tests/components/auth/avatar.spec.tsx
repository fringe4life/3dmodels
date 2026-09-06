import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render } from "@testing-library/react";
import { Avatar } from "../../../src/components/navbar/avatar";

afterEach(() => {
  cleanup();
});

describe("Avatar fallback icon", () => {
  it("marks the decorative svg aria-hidden when there is no image", () => {
    const { container } = render(<Avatar user={{ name: "Ada" }} />);

    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });
});
