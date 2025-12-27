"use client";

import { UnsuccessfulState } from "@/components/not-found/unsuccessful-state";
import { MODELS_ERROR_LIST } from "@/features/models/constants";
import type { ErrorProps } from "@/types";

const ModelDetailError = ({ reset }: ErrorProps) => (
  <UnsuccessfulState
    action={
      <button
        className="rounded-md bg-orange-accent px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-orange-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    }
    heading="Failed to load Model"
    isError
    listItems={MODELS_ERROR_LIST}
    subheading={"Something went wrong while loading the model details."}
  />
);

export default ModelDetailError;
