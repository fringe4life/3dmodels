import "../../setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { Pagination } from "../../../src/components/pagination/pagination";

const firstId = "01900000-0000-7000-8000-000000000001";
const lastId = "01900000-0000-7000-8000-000000000002";

afterEach(() => {
  cleanup();
});

describe("Pagination", () => {
  it("exposes next and previous hrefs as links", () => {
    render(
      <Pagination
        currentLimit={10}
        hasNextPage={true}
        hasPreviousPage={true}
        limitOptions={[
          { href: "/3d-models?limit=5", value: 5 },
          { href: "/3d-models", value: 10 },
          { href: "/3d-models?limit=20", value: 20 },
          { href: "/3d-models?limit=50", value: 50 },
        ]}
        nextHref={`/3d-models?cursor=${lastId}`}
        previousHref={`/3d-models?cursor=${firstId}&direction=backward`}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Next page" }).getAttribute("href"),
    ).toBe(`/3d-models?cursor=${lastId}`);
    expect(
      screen.getByRole("link", { name: "Previous page" }).getAttribute("href"),
    ).toBe(`/3d-models?cursor=${firstId}&direction=backward`);
    expect(screen.getByRole("link", { name: "20" }).getAttribute("href")).toBe(
      "/3d-models?limit=20",
    );
  });
});
