import "../../../tests/setup/test-globals";
import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
// biome-ignore lint/correctness/noUnusedImports: avoid umd issue
import React from "react";
import { ModelsGrid } from "../../../src/features/models/components/models-grid";

describe("ModelsGrid", () => {
  it("renders items", () => {
    render(
      <ModelsGrid
        isAuthenticated={false}
        models={[
          {
            id: "1",
            name: "Alpha Model",
            slug: "alpha",
            imageUrl: "/placeholder.png",
          } as any,
        ]}
        title="Browse"
      />,
    );
    expect(screen.getByText("Alpha Model")).toBeDefined();
  });
});
