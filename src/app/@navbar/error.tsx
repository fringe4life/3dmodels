"use client";

import type { ErrorInfo } from "next/error";
import { InlineErrorFallback } from "@/components/inline-error-fallback";

const NavbarError = ({ retry }: ErrorInfo) => (
  <InlineErrorFallback message="Failed to load User" retry={retry} />
);

export default NavbarError;
