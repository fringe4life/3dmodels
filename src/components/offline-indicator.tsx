"use client";

import { circle, hstack } from "@styled-system/patterns";
import { useOffline } from "next/offline";

export function OfflineBanner() {
  const isOffline = useOffline();

  if (!isOffline) {
    return null;
  }

  return (
    <div
      className={hstack({
        display: { base: "none", md: "flex" },
        padding: 2,
        rounded: "md",
      })}
    >
      <span
        className={circle({
          animation: "pulse",
          backgroundColor: "red.500",
          size: 4,
        })}
      />
      Offline
    </div>
  );
}
