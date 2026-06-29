"use client";

import type { ErrorInfo } from "next/error";
import { ResetButton } from "@/components/form/reset-button";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { MODELS_ERROR_LIST } from "@/features/models/constants";

const ResultsError = ({ retry }: ErrorInfo) => (
  <UnsuccessfulState
    action={<ResetButton onClick={retry} />}
    heading="Failed to load results"
    isError
    listItems={MODELS_ERROR_LIST}
    subheading="Something went wrong while loading the search results."
  />
);

export default ResultsError;
