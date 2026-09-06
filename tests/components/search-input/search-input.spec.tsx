import "../../setup/test-globals";
import { afterEach, describe, expect, it, vi } from "bun:test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../../../src/components/search-input/search-input";
import {
  getLastUrlUpdate,
  withListingNuqsTestingAdapter,
} from "../../setup/nuqs-testing";

afterEach(() => {
  cleanup();
});

describe("SearchInput", () => {
  it("hydrates the input from the query search param", () => {
    render(<SearchInput />, {
      wrapper: withListingNuqsTestingAdapter({
        searchParams: { query: "dragon" },
      }),
    });

    expect(
      screen.getByRole("textbox", { name: "Search models" }),
    ).toHaveProperty("value", "dragon");
  });

  it("is not busy when idle and marks the spinner decorative", () => {
    const { container } = render(<SearchInput />, {
      wrapper: withListingNuqsTestingAdapter(),
    });

    const input = screen.getByRole("textbox", { name: "Search models" });
    expect(input.getAttribute("aria-busy")).not.toBe("true");

    const spinner = container.querySelector("svg");
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute("aria-hidden")).toBe("true");
  });

  it("marks the input busy while a search transition is pending", async () => {
    const user = userEvent.setup();
    const { container } = render(<SearchInput />, {
      wrapper: withListingNuqsTestingAdapter({ hasMemory: true }),
    });

    const input = screen.getByRole("textbox", { name: "Search models" });
    const typing = user.type(input, "x");

    await waitFor(() => {
      expect(input.getAttribute("aria-busy")).toBe("true");
    });

    const spinner = container.querySelector("svg");
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute("aria-hidden")).toBe("true");

    await typing;
  });

  it("writes query, lowercases it, and resets page on Enter", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(<SearchInput />, {
      wrapper: withListingNuqsTestingAdapter({
        hasMemory: true,
        onUrlUpdate,
        searchParams: { page: "2" },
      }),
    });

    const input = screen.getByRole("textbox", { name: "Search models" });
    await user.type(input, "Dragon{Enter}");

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    const event = getLastUrlUpdate(onUrlUpdate);
    expect(event.searchParams.get("query")).toBe("dragon");
    expect(event.searchParams.get("page")).toBeNull();
  });

  it("clears query from the URL when the input is emptied", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn();

    render(<SearchInput />, {
      wrapper: withListingNuqsTestingAdapter({
        hasMemory: true,
        onUrlUpdate,
        searchParams: { query: "dragon" },
      }),
    });

    await user.clear(screen.getByRole("textbox", { name: "Search models" }));

    await waitFor(() => {
      expect(onUrlUpdate.mock.calls.length).toBeGreaterThan(0);
    });

    const event = getLastUrlUpdate(onUrlUpdate);
    expect(event.searchParams.get("query")).toBeNull();
  });
});
