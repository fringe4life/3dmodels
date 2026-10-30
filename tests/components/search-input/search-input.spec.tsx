import "../../setup/test-globals";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../../../src/components/search-input/search-input";
import { navigationReplace } from "../../setup/next-mocks";

afterEach(() => {
  cleanup();
  navigationReplace.mockClear();
  window.history.replaceState({}, "", "/3d-models");
});

beforeEach(() => {
  window.history.replaceState({}, "", "/3d-models");
});

describe("SearchInput", () => {
  it("hydrates the input from the query search param", () => {
    window.history.replaceState({}, "", "/3d-models?query=dragon");
    render(<SearchInput />);

    expect(
      screen.getByRole("textbox", { name: "Search models" }),
    ).toHaveProperty("value", "dragon");
  });

  it("is not busy when idle and marks the spinner decorative", () => {
    const { container } = render(<SearchInput />);

    const input = screen.getByRole("textbox", { name: "Search models" });
    expect(input.getAttribute("aria-busy")).not.toBe("true");

    const spinner = container.querySelector("svg");
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute("aria-hidden")).toBe("true");
  });

  it("marks the input busy while a search transition is pending", async () => {
    const user = userEvent.setup();
    const { container } = render(<SearchInput />);

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

  it("writes query, lowercases it, and resets cursor on Enter", async () => {
    const user = userEvent.setup();
    window.history.replaceState(
      {},
      "",
      "/3d-models?cursor=01900000-0000-7000-8000-000000000001&direction=backward",
    );

    render(<SearchInput />);

    const input = screen.getByRole("textbox", { name: "Search models" });
    await user.type(input, "Dragon{Enter}");

    await waitFor(() => {
      expect(navigationReplace.mock.calls.length).toBeGreaterThan(0);
    });

    const href = String(navigationReplace.mock.calls.at(-1)?.[0] ?? "");
    const params = new URL(href, "http://local.invalid").searchParams;
    expect(params.get("query")).toBe("dragon");
    expect(params.get("cursor")).toBeNull();
    expect(params.get("direction")).toBeNull();
    expect(navigationReplace.mock.calls.at(-1)?.[1]).toEqual({ scroll: false });
  });

  it("clears query from the URL when the input is emptied", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/3d-models?query=dragon");

    render(<SearchInput />);

    await user.clear(screen.getByRole("textbox", { name: "Search models" }));

    await waitFor(() => {
      expect(navigationReplace.mock.calls.length).toBeGreaterThan(0);
    });

    const href = String(navigationReplace.mock.calls.at(-1)?.[0] ?? "");
    const params = new URL(href, "http://local.invalid").searchParams;
    expect(params.get("query")).toBeNull();
  });
});
