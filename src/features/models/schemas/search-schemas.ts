import {
  type BaseIssue,
  type BaseSchema,
  boolean,
  type InferInput,
  type InferOutput,
  maxLength,
  minLength,
  object,
  optional,
  picklist,
  pipe,
  safeParse,
  string,
} from "valibot";

// Constants for validation limits
const MAX_SEARCH_QUERY_LENGTH = 100;

// Schema for basic search form data
export const searchFormSchema = object({
  query: pipe(
    string("Search query must be a string"),
    minLength(1, "Search query is required"),
    maxLength(MAX_SEARCH_QUERY_LENGTH, "Search query too long"),
  ),
});

// Schema for advanced search form data
export const advancedSearchFormSchema = object({
  query: optional(string()),
  category: optional(string()),
  sortBy: optional(picklist(["name", "likes", "dateAdded"])),
});

// Schema for search preferences
export const searchPreferencesSchema = object({
  defaultQuery: optional(string()),
  defaultCategory: optional(string()),
  autoSearch: optional(boolean()),
});

// Type exports
export type SearchFormData = InferInput<typeof searchFormSchema>;
export type SearchPreferencesData = InferInput<typeof searchPreferencesSchema>;

// Helper function to parse FormData with Valibot
export function parseFormData<
  TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  formData: FormData,
  schema: TSchema,
):
  | {
      success: true;
      data: InferOutput<TSchema>;
    }
  | {
      success: false;
      error: string;
    } {
  try {
    // Convert FormData to object
    const data: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      // Handle boolean values
      if (value === "true") {
        data[key] = true;
      } else if (value === "false") {
        data[key] = false;
      } else {
        data[key] = value;
      }
    }

    const result = safeParse(schema, data);

    if (result.success) {
      return { success: true, data: result.output };
    }
    return {
      success: false,
      error: "Validation failed",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
