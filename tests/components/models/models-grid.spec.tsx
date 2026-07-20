import "../../../tests/setup/test-globals";
import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { withNuqsTestingAdapter } from "nuqs/adapters/testing";
import { ModelsGrid } from "../../../src/features/models/components/models-grid";

describe("ModelsGrid", () => {
  it("renders items", () => {
    render(
      <ModelsGrid
        isAuthenticated={false}
        models={[
          {
            id: "1",
            imageUrl: "/placeholder.png",
            name: "Alpha Model",
            slug: "alpha",
          } as any,
        ]}
        title="Browse"
      />,
      { wrapper: withNuqsTestingAdapter() },
    );
    expect(screen.getByText("Alpha Model")).toBeDefined();
  });
});
