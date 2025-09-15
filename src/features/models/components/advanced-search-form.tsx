/** biome-ignore-all lint/correctness/useUniqueElementIds: is just example file */
"use client";

import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { useActionState, useTransition } from "react";
import {
  performAdvancedSearch,
  type SearchActionState,
} from "@/features/models/actions/search-actions";

const initialState: SearchActionState = {
  message: "",
  error: "",
  results: 0,
  query: "",
};

// Define search parameters for nuqs
const searchParams = {
  query: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
  sortBy: parseAsStringLiteral(["name", "likes", "date"] as const).withDefault(
    "name",
  ),
};

export function AdvancedSearchForm() {
  const [, startTransition] = useTransition();
  const [state, formAction, pending] = useActionState(
    performAdvancedSearch,
    initialState,
  );

  // nuqs for managing multiple URL parameters
  const [searchState, setSearchState] = useQueryStates(searchParams, {
    history: "push",
    shallow: true,
  });

  const handleInputChange = (
    field: keyof typeof searchState,
    value: string,
  ) => {
    startTransition(() => {
      setSearchState({ [field]: value || null });
    });
  };

  const handleFormSubmit = (formData: FormData) => {
    // Update URL state with form data
    const query = formData.get("query") as string;
    const category = formData.get("category") as string;
    const sortBy = formData.get("sortBy") as "name" | "likes" | "date";

    setSearchState({
      query: query || null,
      category: category || null,
      sortBy: sortBy || null,
    });

    // Trigger server action
    formAction(formData);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-lg">Advanced Search</h3>

        {/* Real-time URL state display */}
        <div className="mb-4 rounded-lg bg-gray-50 p-3">
          <p className="mb-2 text-gray-600 text-sm">Current URL State:</p>
          <div className="font-mono text-xs">
            <div>Query: {searchState.query || "none"}</div>
            <div>Category: {searchState.category || "all"}</div>
            <div>Sort: {searchState.sortBy}</div>
          </div>
        </div>

        {/* Search form with useActionState */}
        <form action={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="query"
              >
                Search Query
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-0"
                defaultValue={searchState.query}
                id="query"
                name="query"
                placeholder="Enter search term..."
                type="text"
              />
            </div>

            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-0"
                defaultValue={searchState.category}
                id="category"
                name="category"
              >
                <option value="">All Categories</option>
                <option value="figures">Figures</option>
                <option value="functional">Functional</option>
                <option value="decorative">Decorative</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>

            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="sortBy"
              >
                Sort By
              </label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-0"
                defaultValue={searchState.sortBy}
                id="sortBy"
                name="sortBy"
              >
                <option value="name">Name</option>
                <option value="likes">Most Liked</option>
                <option value="date">Date Added</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="rounded-md bg-black px-6 py-2 font-medium text-sm text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pending}
              type="submit"
            >
              {pending ? "Searching..." : "Search"}
            </button>

            <button
              className="rounded-md border border-gray-300 px-6 py-2 font-medium text-gray-700 text-sm hover:bg-gray-50"
              onClick={() => {
                setSearchState({
                  query: null,
                  category: null,
                  sortBy: null,
                });
              }}
              type="button"
            >
              Clear All
            </button>
          </div>
        </form>

        {/* Action state feedback */}
        {state.message && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="font-medium text-green-800 text-sm">
              {state.message}
            </p>
            {state.results !== undefined && (
              <p className="mt-1 text-green-600 text-xs">
                Found {state.results} models
              </p>
            )}
          </div>
        )}

        {state.error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="font-medium text-red-800 text-sm">{state.error}</p>
          </div>
        )}
      </div>

      {/* Real-time URL state controls */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h4 className="mb-3 font-semibold text-md">
          Quick Filters (URL State)
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-full bg-blue-100 px-3 py-1 text-blue-800 text-xs hover:bg-blue-200"
            onClick={() => handleInputChange("category", "figures")}
            type="button"
          >
            Figures
          </button>
          <button
            className="rounded-full bg-green-100 px-3 py-1 text-green-800 text-xs hover:bg-green-200"
            onClick={() => handleInputChange("category", "functional")}
            type="button"
          >
            Functional
          </button>
          <button
            className="rounded-full bg-purple-100 px-3 py-1 text-purple-800 text-xs hover:bg-purple-200"
            onClick={() => handleInputChange("sortBy", "likes")}
            type="button"
          >
            Most Liked
          </button>
          <button
            className="rounded-full bg-orange-100 px-3 py-1 text-orange-800 text-xs hover:bg-orange-200"
            onClick={() => handleInputChange("sortBy", "date")}
            type="button"
          >
            Newest
          </button>
        </div>
      </div>
    </div>
  );
}
