import "@/tests/setup/test-globals";
import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ModelsGrid } from "@/features/models/components/models-grid";

describe("ModelsGrid", () => {
  it("renders items", () => {
    render(
      <ModelsGrid
        models={[
          {
            id: "1",
            name: "Test",
            slug: "test",
            imageUrl: "/placeholder.png",
          } as any,
        ]}
      />,
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
