import "../../../tests/setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModelsSortControls } from "../../../src/features/models/components/models-sort-controls";
import {
  getLastUrlUpdate,
  withListingNuqsTestingAdapter,
} from "../../setup/nuqs-testing";

afterEach(() => {
  cleanup();
});

describe("ModelsSortControls", () => {
  it("marks the URL sort as checked", () => {
    render(<ModelsSortControls />, {
      wrapper: withListingNuqsTestingAdapter({
        searchParams: { sort: "recent" },
      }),
    });

    const recent = screen.getByRole("radio", { name: "Recent" });
    expect(recent).toHaveProperty("checked", true);
  });

  it("writes sort and clears default page on change", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(<ModelsSortControls />, {
      wrapper: withListingNuqsTestingAdapter({
        hasMemory: true,
        onUrlUpdate,
        searchParams: { page: "2", sort: "alphabetic" },
      }),
    });

    await user.click(screen.getByRole("radio", { name: "Popular" }));

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    const event = getLastUrlUpdate(onUrlUpdate);
    expect(event.searchParams.get("sort")).toBe("popular");
    expect(event.searchParams.get("page")).toBeNull();
    expect(event.options.history).toBe("replace");
  });
});
