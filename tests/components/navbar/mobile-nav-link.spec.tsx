/** biome-ignore-all lint/performance/useTopLevelRegex: test */
import "../../../tests/setup/test-globals";
import { describe, expect, it, vi } from "bun:test";
import { fireEvent, render } from "@testing-library/react";
import { MobileNavLink } from "../../../src/components/navbar/mobile-nav-link";

const TEST_POPOVER_ID = "test-popover";

describe("MobileNavLink", () => {
  it("closes the nearest ancestor popover on click", () => {
    const hidePopover = vi.fn();

    render(
      <div id={TEST_POPOVER_ID} popover="auto">
        <MobileNavLink href="/about" label="About" prefetch />
      </div>,
    );

    const popover = document.getElementById(TEST_POPOVER_ID) as HTMLElement & {
      hidePopover: () => void;
    };
    popover.hidePopover = hidePopover;

    fireEvent.click(
      document.querySelector('a[href="/about"]') as HTMLAnchorElement,
    );
    expect(hidePopover).toHaveBeenCalledTimes(1);
  });

  it("passes typed-route link config through to NavLink", () => {
    render(<MobileNavLink href="/3d-models" label="3D Models" />);

    const link = document.querySelector('a[href="/3d-models"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toContain("3D Models");
  });
});
