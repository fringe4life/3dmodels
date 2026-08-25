import anchorPositioningPolyfill from "@oddbird/css-anchor-positioning/fn";
import {
  apply as applyPopoverPolyfill,
  isSupported as isPopoverSupported,
} from "@oddbird/popover-polyfill/fn";

function isAnchorPositioningSupported(): boolean {
  return "anchorName" in document.documentElement.style;
}

if (!isPopoverSupported()) {
  applyPopoverPolyfill();
}

if (!isAnchorPositioningSupported()) {
  anchorPositioningPolyfill();
}
