function isPopoverSupported(): boolean {
  return (
    typeof HTMLElement !== "undefined" &&
    typeof HTMLElement.prototype === "object" &&
    "popover" in HTMLElement.prototype &&
    "showPopover" in HTMLElement.prototype
  );
}

function isAnchorPositioningSupported(): boolean {
  return "anchorName" in document.documentElement.style;
}

/**
 * Dynamic `import()` keeps Oddbird polyfills out of the main client graph.
 * Fire-and-forget: may finish after hydration — acceptable when native support
 * covers most traffic and late apply is OK for the remaining browsers.
 */
async function applyPolyfills(): Promise<void> {
  if (!isPopoverSupported()) {
    const { apply } = await import("@oddbird/popover-polyfill/fn");
    apply();
  }

  if (!isAnchorPositioningSupported()) {
    const { default: polyfill } = await import(
      "@oddbird/css-anchor-positioning/fn"
    );
    await polyfill();
  }
}

applyPolyfills().catch(() => {
  // Polyfill failure should not block the app.
});
