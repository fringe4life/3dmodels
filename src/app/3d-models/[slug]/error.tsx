"use client";

import type { ErrorInfo } from "next/error";
import { ResetButton } from "@/components/form/reset-button";
import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { MODELS_ERROR_LIST } from "@/features/models/constants";

const ModelDetailError = ({ unstable_retry }: ErrorInfo) => (
  <UnsuccessfulState
    action={<ResetButton onClick={unstable_retry} />}
    heading="Failed to load Model"
    isError
    listItems={MODELS_ERROR_LIST}
    subheading={"Something went wrong while loading the model."}
  />
);

export default ModelDetailError;
