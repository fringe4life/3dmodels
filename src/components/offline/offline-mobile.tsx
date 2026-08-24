"use client";

import { css, cx } from "@styled-system/css";
import { circle, hstack } from "@styled-system/patterns";
import { useOffline } from "next/offline";

const mobileConnectivityStatusClassName = hstack({
  color: "brand",
  fontSize: "xs",
  fontWeight: "semibold",
  gap: 1.5,
});

const mobileConnectivityDotClassName = cx(
  circle({
    backgroundColor: "brand",
    size: 1,
  }),
  css({
    _motionReduce: { animation: "none" },
    animation: "connectivityPulse 2s ease-in-out infinite",
  }),
);

export function MobileConnectivityStatus() {
  const isOffline = useOffline();

  if (!isOffline) {
    return null;
  }

  return (
    <span
      aria-atomic="true"
      aria-live="polite"
      className={mobileConnectivityStatusClassName}
      role="status"
    >
      <span aria-hidden="true" className={mobileConnectivityDotClassName} />
      Offline
    </span>
  );
}
