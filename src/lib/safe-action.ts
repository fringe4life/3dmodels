import "server-only";

import { APIError } from "better-auth/api";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
  returnServerError,
} from "next-safe-action";
import { type GenericSchema, type InferOutput, instance } from "valibot";
import { EMPTY_LIST_LENGTH } from "@/constants";
import { getUser } from "@/lib/auth/get-user";

const HTTP_CLIENT_ERROR_MIN = 400;
const HTTP_CLIENT_ERROR_MAX = 499;

const logUnexpectedActionError = (error: Error): void => {
  console.error("Action error:", error);
};

const isClientSafeApiError = (error: APIError): boolean =>
  error.statusCode >= HTTP_CLIENT_ERROR_MIN &&
  error.statusCode <= HTTP_CLIENT_ERROR_MAX &&
  error.message.length > EMPTY_LIST_LENGTH;

const handleServerError = (error: Error): string => {
  if (error instanceof APIError && isClientSafeApiError(error)) {
    return error.message;
  }

  logUnexpectedActionError(error);
  return DEFAULT_SERVER_ERROR_MESSAGE;
};

/**
 * Empty FormData schema so `.stateAction()` `formAction` accepts native form submit.
 */
const formActionInput = instance(FormData);

interface StandardIssue {
  readonly message: string;
}

type StandardResult<TOutput> =
  | { readonly issues: readonly StandardIssue[] }
  | { readonly value: TOutput };

interface FormDataObjectSchema<TOutput> {
  readonly "~standard": {
    readonly types: {
      input: FormData;
      output: TOutput;
    };
    readonly validate: (
      value: unknown,
    ) => Promise<StandardResult<TOutput>> | StandardResult<TOutput>;
    readonly vendor: "valibot";
    readonly version: 1;
  };
}

type FormDataObjectValue = FormDataEntryValue | FormDataEntryValue[];

/**
 * Map FormData to a plain object. Repeated keys stay arrays; File/Blob stay as-is.
 */
const formDataToObject = (
  formData: FormData,
): Record<string, FormDataObjectValue> => {
  const data: Record<string, FormDataObjectValue> = {};
  for (const key of new Set(formData.keys())) {
    const values = formData.getAll(key);
    const [firstValue, ...restValues] = values;
    data[key] =
      restValues.length === EMPTY_LIST_LENGTH && firstValue !== undefined
        ? firstValue
        : values;
  }
  return data;
};

/**
 * Map FormData from `<form action={formAction}>` into a Valibot object schema.
 */
const formDataInput = <TSchema extends GenericSchema>(
  schema: TSchema,
): FormDataObjectSchema<InferOutput<TSchema>> => ({
  "~standard": {
    types: {
      input: undefined as unknown as FormData,
      output: undefined as unknown as InferOutput<TSchema>,
    },
    validate: (value) => {
      const data = value instanceof FormData ? formDataToObject(value) : value;
      return schema["~standard"].validate(data) as
        | Promise<StandardResult<InferOutput<TSchema>>>
        | StandardResult<InferOutput<TSchema>>;
    },
    vendor: "valibot",
    version: 1,
  },
});

const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  handleServerError,
});

const authActionClient = actionClient.use(async ({ next }) => {
  const auth = await getUser();
  if (!auth.isAuthenticated) {
    returnServerError("Authentication required");
  }

  return next({
    ctx: { user: auth.user },
  });
});

export { actionClient, authActionClient, formActionInput, formDataInput };
