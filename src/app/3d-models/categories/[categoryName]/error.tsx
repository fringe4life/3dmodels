"use client";

import type { ErrorInfo } from "next/error";
import { ResetButton } from "@/components/form/reset-button";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { MODELS_ERROR_LIST } from "@/features/models/constants";

const CategoryResultError = ({ retry }: ErrorInfo) => (
  <UnsuccessfulState
    action={<ResetButton onClick={retry} />}
    heading="Failed to load Models for Category"
    isError
    listItems={MODELS_ERROR_LIST}
    subheading="Something went wrong while loading the category models."
  />
);

export default CategoryResultError;
