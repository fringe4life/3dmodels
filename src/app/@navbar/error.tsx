"use client";

import { css } from "@styled-system/css";
import { flex } from "@styled-system/patterns";
import type { ErrorInfo } from "next/error";
import { ResetButton } from "@/components/form/reset-button";

const NavbarError = ({ unstable_retry }: ErrorInfo) => (
  <div
    className={flex({
      direction: { md: "column" },
      padding: 4,
      align: { base: "center", md: "start" },
      gap: 4,
    })}
  >
    <p className={css({ color: "gray.600", fontSize: "sm" })}>
      Failed to load User
    </p>
    <ResetButton onClick={unstable_retry} />
  </div>
);

export default NavbarError;
