import "../../setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { PaginationPageControl } from "../../../src/components/pagination/pagination-page-control";

afterEach(() => {
  cleanup();
});

describe("PaginationPageControl", () => {
  it("renders pager links when hrefs are available", () => {
    render(
      <PaginationPageControl
        hasNextPage={true}
        hasPreviousPage={true}
        nextHref="/3d-models?cursor=next&direction=forward"
        previousHref="/3d-models?cursor=prev&direction=backward"
      />,
    );

    expect(
      screen.getByRole("link", { name: "Previous page" }).getAttribute("href"),
    ).toBe("/3d-models?cursor=prev&direction=backward");
    expect(
      screen.getByRole("link", { name: "Next page" }).getAttribute("href"),
    ).toBe("/3d-models?cursor=next&direction=forward");
  });

  it("disables both controls when pages are unavailable", () => {
    render(
      <PaginationPageControl
        hasNextPage={false}
        hasPreviousPage={false}
        nextHref={null}
        previousHref={null}
      />,
    );

    expect(
      (
        screen.getByRole("button", {
          name: "Previous page",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: "Next page" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });
});
