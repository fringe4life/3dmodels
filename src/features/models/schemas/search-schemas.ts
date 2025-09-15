import { z } from "zod";

// Constants for validation limits
const MAX_SEARCH_QUERY_LENGTH = 100;

// Schema for basic search form data
export const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(MAX_SEARCH_QUERY_LENGTH, "Search query too long"),
});

// Schema for advanced search form data
export const advancedSearchFormSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  sortBy: z.enum(["name", "likes", "dateAdded"]).optional(),
});

// Schema for search preferences
export const searchPreferencesSchema = z.object({
  defaultQuery: z.string().optional(),
  defaultCategory: z.string().optional(),
  autoSearch: z.boolean().optional(),
});

// Type exports
export type SearchFormData = z.infer<typeof searchFormSchema>;
export type AdvancedSearchFormData = z.infer<typeof advancedSearchFormSchema>;
export type SearchPreferencesData = z.infer<typeof searchPreferencesSchema>;

// Helper function to parse FormData with Zod
export function parseFormData<T>(
  formData: FormData,
  schema: z.ZodSchema<T>,
):
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      issues?: z.ZodError["issues"];
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

    const result = schema.safeParse(data);

    if (result.success) {
      return { success: true, data: result.data };
    }
    return {
      success: false,
      error: "Validation failed",
      issues: result.error.issues,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
