"use client";

import { css, cx } from "@styled-system/css";
import { circle, hstack, square } from "@styled-system/patterns";
import { useOffline } from "next/offline";
import { MdWifiOff } from "react-icons/md";

const offlineIndicatorClassName = hstack({
  backgroundColor: "bg.surface",
  borderColor: "border.subtle",
  borderWidth: 1,
  color: "text.secondary",
  display: "flex",
  flexShrink: 0,
  fontSize: { base: "xs", md: "sm" },
  gap: { base: 1.5, md: 2 },
  justifySelf: "center",
  paddingBlock: { base: 1, md: 2 },
  paddingInline: { base: 1, md: 3 },
  rounded: "full",
  shadow: "sm",
  shadowColor: "gray.300/20",
  whiteSpace: "nowrap",
});

const offlineIconContainerClassName = cx(
  circle({
    backgroundColor: "brand.subtle",
    size: { base: 6, md: 7 },
  }),
  css({
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
  }),
);

const offlineIconClassName = cx(square({ size: 4 }), css({ color: "brand" }));

const offlineLabelClassName = css({
  "@container navbar-status (min-width: 20ch)": {
    clip: "auto",
    height: "auto",
    margin: 0,
    overflow: "visible",
    padding: 0,
    position: "static",
    whiteSpace: "normal",
    width: "auto",
  },
  fontWeight: "semibold",
  srOnly: true,
});

const offlineSupportingTextClassName = css({
  "@container navbar-status (min-width: 50ch)": {
    display: "inline",
  },
  color: "text.muted",
  display: "none",
});

export function OfflineBanner() {
  const isOffline = useOffline();

  if (!isOffline) {
    return null;
  }

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className={offlineIndicatorClassName}
      role="status"
    >
      <span className={offlineIconContainerClassName}>
        <MdWifiOff aria-hidden="true" className={offlineIconClassName} />
      </span>
      <span className={offlineLabelClassName}>Offline</span>
      <span className={offlineSupportingTextClassName}>
        {" · cached browsing available"}
      </span>
    </div>
  );
}
