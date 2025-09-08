"use server";

import { revalidatePath } from "next/cache";
import { getModels } from "@/features/models/queries/models";

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
    const query = formData.get("query") as string;

    if (!query || query.trim().length === 0) {
      return {
        message: "Please enter a search term",
        query: "",
      };
    }

    // Get all models and filter them
    const allModels = await getModels();
    const filteredModels = allModels.filter(
      (model) =>
        model.name.toLowerCase().includes(query.toLowerCase()) ||
        model.description.toLowerCase().includes(query.toLowerCase()),
    );

    // Revalidate the page to show updated results
    revalidatePath("/3d-models");

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
    const query = formData.get("query") as string;
    const category = formData.get("category") as string;
    const sortBy = formData.get("sortBy") as string;

    if (!query && !category) {
      return {
        message: "Please enter a search term or select a category",
        query: "",
      };
    }

    // Get models with optional category filter
    const models = await getModels(category ? { category } : undefined);

    // Filter by query if provided
    const filteredModels = query
      ? models.filter(
          (model) =>
            model.name.toLowerCase().includes(query.toLowerCase()) ||
            model.description.toLowerCase().includes(query.toLowerCase()),
        )
      : models;

    // Sort results if specified
    const sortedModels =
      sortBy === "likes"
        ? filteredModels.sort((a, b) => b.likes - a.likes)
        : sortBy === "name"
          ? filteredModels.sort((a, b) => a.name.localeCompare(b.name))
          : filteredModels;

    revalidatePath("/3d-models");

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
export async function saveSearchPreferences(
  prevState: SearchActionState,
  _formData: FormData,
): Promise<SearchActionState> {
  try {
    // In a real app, you'd extract and save these to user preferences in the database
    // const defaultQuery = formData.get('defaultQuery') as string
    // const defaultCategory = formData.get('defaultCategory') as string
    // const autoSearch = formData.get('autoSearch') === 'true'

    revalidatePath("/3d-models");

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
