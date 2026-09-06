/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../setup/test-globals";
import { afterEach, describe, expect, it } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { PendingButton } from "../../src/components/pending-button";

afterEach(() => {
  cleanup();
});

const getPendingButton = (name: RegExp | string) =>
  screen.getByRole("button", { name }) as HTMLButtonElement;

const getSpinner = (button: HTMLButtonElement) => button.querySelector("svg");

describe("PendingButton pending accessible name", () => {
  it("keeps the children name, marks busy, and hides the spinner while pending", () => {
    render(<PendingButton isPending>Sign in</PendingButton>);

    const button = getPendingButton(/sign in/i);
    expect(button.getAttribute("aria-busy")).toBe("true");

    const spinner = getSpinner(button);
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute("aria-hidden")).toBe("true");
  });

  it("exposes the children name and hides the spinner when idle", () => {
    render(<PendingButton isPending={false}>Sign in</PendingButton>);

    const button = getPendingButton(/^sign in$/i);
    expect(button.getAttribute("aria-busy")).not.toBe("true");

    const spinner = getSpinner(button);
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute("aria-hidden")).toBe("true");
  });
});
