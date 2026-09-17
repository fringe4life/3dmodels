import "../../setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { PaginationPageControl } from "../../../src/components/pagination/pagination-page-control";

afterEach(() => {
  cleanup();
});

describe("PaginationPageControl", () => {
  it("disables both buttons while navigation is pending", () => {
    render(
      <PaginationPageControl
        hasNextPage={true}
        hasPreviousPage={true}
        isPending={true}
        onNextPage={vi.fn()}
        onPreviousPage={vi.fn()}
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
