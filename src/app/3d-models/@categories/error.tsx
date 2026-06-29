"use client";

import { css } from "@styled-system/css";
import { flex } from "@styled-system/patterns";
import type { ErrorInfo } from "next/error";
import { ResetButton } from "@/components/form/reset-button";

const CategoriesError = ({ retry }: ErrorInfo) => (
  <div
    className={flex({
      align: { base: "center", md: "start" },
      direction: { md: "column" },
      gap: 4,
      padding: 4,
    })}
  >
    <p className={css({ fontSize: "sm", color: "gray.500" })}>
      Failed to load categories
    </p>
    <ResetButton onClick={retry} />
  </div>
);

export default CategoriesError;
