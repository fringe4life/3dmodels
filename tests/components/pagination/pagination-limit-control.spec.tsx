import "../../setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { PaginationLimitControl } from "../../../src/components/pagination/pagination-limit-control";

afterEach(() => {
  cleanup();
});

describe("PaginationLimitControl", () => {
  it("renders limit links and marks the current limit", () => {
    render(
      <PaginationLimitControl
        currentLimit={10}
        options={[
          { href: "/3d-models?limit=5", value: 5 },
          { href: "/3d-models", value: 10 },
          { href: "/3d-models?limit=20", value: 20 },
          { href: "/3d-models?limit=50", value: 50 },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "20" }).getAttribute("href")).toBe(
      "/3d-models?limit=20",
    );
    expect(
      screen.getByRole("link", { name: "10" }).getAttribute("aria-current"),
    ).toBe("page");
  });
});
