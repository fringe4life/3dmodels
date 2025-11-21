"use server";

import {
  searchModels,
  searchModelsAdvanced,
} from "@/features/models/queries/search-models";
import {
  advancedSearchFormSchema,
  parseFormData,
  searchFormSchema,
} from "@/features/models/schemas/search-schemas";
import { invalidateAllModels } from "@/utils/cache-invalidation";
import { tryCatch } from "@/utils/try-catch";

// Type for search action state
export type SearchActionState = {
  message?: string;
  error?: string;
  results?: number;
  query?: string;
};

// Server action for search with useActionState
export async function performSearch(
  prevState: SearchActionState,
  formData: FormData,
): Promise<SearchActionState> {
  try {
    // Validate form data with Zod
    const validation = parseFormData(formData, searchFormSchema);

    if (!validation.success) {
      return {
        error: validation.error,
        query: prevState.query || "",
      };
    }

    const { query } = validation.data;

    // Use optimized search function with database-level filtering
    const { data: filteredModels, error } = await tryCatch(
      async () => await searchModels(query),
    );

    if (error || !filteredModels) {
      return {
        error: "Failed to perform search. Please try again.",
        query: prevState.query || "",
      };
    }

    // Revalidate the models cache to show updated results
    invalidateAllModels();

    return {
      message: `Found ${filteredModels.length} models for "${query}"`,
      results: filteredModels.length,
      query: query.trim(),
    };
  } catch {
    return {
      error: "Failed to perform search. Please try again.",
      query: prevState.query || "",
    };
  }
}

// Server action for advanced search with multiple parameters
export async function performAdvancedSearch(
  prevState: SearchActionState,
  formData: FormData,
): Promise<SearchActionState> {
  try {
    // Validate form data with Valibot
    const validation = parseFormData(formData, advancedSearchFormSchema);

    if (!validation.success) {
      return {
        error: validation.error,
        query: prevState.query ?? "",
      };
    }

    const { query, category, sortBy } = validation.data;

    if (!(query || category)) {
      return {
        message: "Please enter a search term or select a category",
        query: "",
      };
    }

    // Use optimized advanced search function with database-level filtering and sorting
    const { data: sortedModels, error } = await tryCatch(
      async () => await searchModelsAdvanced(query, category, sortBy),
    );

    if (error || !sortedModels) {
      return {
        error: "Failed to perform advanced search. Please try again.",
        query: prevState.query ?? "",
      };
    }

    invalidateAllModels();

    return {
      message: `Found ${sortedModels.length} models${category ? ` in ${category}` : ""}${query ? ` for "${query}"` : ""}`,
      results: sortedModels.length,
      query: query || "",
    };
  } catch {
    return {
      error: "Failed to perform advanced search. Please try again.",
      query: prevState.query || "",
    };
  }
}

// Server action for saving search preferences
// biome-ignore lint/suspicious/useAwait: server action
export async function saveSearchPreferences(
  prevState: SearchActionState,
  _formData: FormData,
): Promise<SearchActionState> {
  try {
    // In a real app, you'd extract and save these to user preferences in the database
    // const defaultQuery = formData.get('defaultQuery') as string
    // const defaultCategory = formData.get('defaultCategory') as string
    // const autoSearch = formData.get('autoSearch') === 'true'

    invalidateAllModels();

    return {
      message: "Search preferences saved successfully!",
      query: prevState.query || "",
    };
  } catch {
    return {
      error: "Failed to save search preferences.",
      query: prevState.query || "",
    };
  }
}
