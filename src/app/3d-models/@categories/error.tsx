"use client";

import type { ErrorInfo } from "next/error";
import { InlineErrorFallback } from "@/components/inline-error-fallback";

const CategoriesError = ({ retry }: ErrorInfo) => (
  <InlineErrorFallback message="Failed to load categories" retry={retry} />
);

export default CategoriesError;
